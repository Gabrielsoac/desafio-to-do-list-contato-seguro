import { UserModel } from '../../src/models/UserModel'
import { MongodbUserRepository } from '../../src/infra/repository/user/MongodbUserRepository'
import { User } from '../../src/domain/entities/user/User';
import { UserAlreadyExistsError } from '../../src/errors/user/UserAlreadyExistsError';
import { CreateOutputPersistedUser } from '../../src/infra/repository/user/CreateOutputPersistedUser';
import { UserBuilder } from '../builders/user/UserBuilder';
import { UserPersistedBuilder } from '../builders/user/UserPersistedBuilder';
import { UserNotFoundError } from '../../src/errors/user/UserNotFoundError';
jest.mock('../../src/models/UserModel');

describe(
    'Create User', 
    () => {

        const mockUser = UserBuilder.aUser().build();

        beforeEach(
            () => {
                jest.clearAllMocks();
            });
        
        it(
            'Should throw Error when User Already Exists',
            async () => {

                const userRepository = new MongodbUserRepository();

                UserModel.findOne = jest.fn().mockResolvedValue(mockUser);

                const user: User = UserBuilder.aUser().build();

                await expect(
                    userRepository.createUser(user)
                ).rejects.toThrow(UserAlreadyExistsError);

                expect(UserModel.findOne).toHaveBeenCalledWith({email: user.getEmail()});
            }
        );

        it(
            'Should create a new user with sucess',
            async () => {

                const userRepository = new MongodbUserRepository();
                const persistedUser = UserPersistedBuilder.aUser().build();

                (UserModel.findOne as jest.Mock).mockResolvedValue(null);
                UserModel.create = jest.fn().mockResolvedValue(persistedUser);

                CreateOutputPersistedUser.create = jest.fn().mockResolvedValue(
                    {
                        id: persistedUser.id,
                        name: persistedUser.name,
                        email: persistedUser.email
                    }
                );
            
                const user: User = UserBuilder.aUser().build();

                expect(
                    await userRepository.createUser(user)
                ).toEqual(
                    {
                        id: persistedUser.id,
                        name: persistedUser.name,
                        email: persistedUser.email
                    }
                );
            }
        )
    }
);

describe(
    'FindUserById',
    () => {

        beforeEach(
            () => {
                jest.clearAllMocks();
            });
        
        it(
            'should to get user with sucess',
            async () => {

                const userRepository = new MongodbUserRepository();
                const mockUserPersisted = UserPersistedBuilder
                    .aUser().build();

                UserModel.findById = jest.fn()
                    .mockResolvedValue(mockUserPersisted);

                expect(
                    await userRepository.findById(mockUserPersisted.id)
                ).toEqual({
                    id: mockUserPersisted.id,
                    name: mockUserPersisted.name,
                    email: mockUserPersisted.email
                });
            }
        );

        it(
            'should to throw Error when User Not Found',
            async () => {

                const userRepository = new MongodbUserRepository();
                UserModel.findById = jest.fn()
                    .mockResolvedValue(null);

                await expect(
                    userRepository.findById('123456789')
                ).rejects.toThrow(UserNotFoundError);

                expect(UserModel.findById).toHaveBeenCalledWith('123456789');
            }
        );
    }
);

describe(
    'Update User By Id',
    () => {

        beforeEach(
            () => {
                jest.clearAllMocks();
            });
        
        it(
            'should to update user with sucess',
            async () => {
                
                const userPersistedMock = UserPersistedBuilder.aUser().build();
                const userRepository = new MongodbUserRepository();

                UserModel.findById = jest.fn().mockResolvedValue(userPersistedMock);

                UserModel.findOne = jest.fn().mockResolvedValue(null);

                UserModel.findByIdAndUpdate = jest.fn().mockResolvedValue(userPersistedMock);

                expect(await userRepository.updateUser(
                    {
                        id: userPersistedMock.id,
                        name: userPersistedMock.name,
                        email: userPersistedMock.email,
                        password: userPersistedMock.password
                    }                    
                )).toEqual(
                    {
                        id: userPersistedMock.id,
                        name: userPersistedMock.name,
                        email: userPersistedMock.email,
                    }
                );
            }
        );

        it(
            'should to throw Error when user not found',
            async () => {

                const userRepository = new MongodbUserRepository();


                const persistedUser = UserPersistedBuilder.aUser().build();
                UserModel.findById = jest.fn().mockResolvedValue(null);

                await expect(
                    userRepository.updateUser(persistedUser)
                ).rejects.toThrow(UserNotFoundError);

                expect(UserModel.findById).toHaveBeenCalledTimes(1);
            }
        );

        it(
            'should to throw Error when email already exists',
            async () => {

                const userRepository = new MongodbUserRepository();
        
                const persistedUser = UserPersistedBuilder.aUser().build();
                const otherPersistedUser = UserPersistedBuilder
                    .aUser()
                    .withId('987654321')
                .build();

                UserModel.findById = jest.fn().mockResolvedValue(persistedUser);

                UserModel.findOne = jest.fn().mockResolvedValue(
                    {
                        _id: otherPersistedUser.id,
                        name: otherPersistedUser.name,
                        email: otherPersistedUser.email,
                        password: otherPersistedUser.password
                    }
                );

                await expect(userRepository
                    .updateUser(persistedUser))
                        .rejects.toThrow(UserAlreadyExistsError);
                
                expect(UserModel.findOne).toHaveBeenCalledWith({email: persistedUser.email});
            }
        );

        it(
            'Should to throw Error when Internal Error',
            async () => {

                const userRepository = new MongodbUserRepository();
                const persistedUser = UserPersistedBuilder.aUser().build();

                UserModel.findByIdAndUpdate = jest.fn().mockResolvedValue(null);
                UserModel.findById = jest.fn().mockResolvedValue(persistedUser);
                UserModel.findOne = jest.fn().mockResolvedValue(null);

                await expect(
                    userRepository.updateUser(persistedUser)
                ).rejects.toThrow(Error);

                expect(UserModel.findByIdAndUpdate).toHaveBeenCalledTimes(1);
            }
        );
    }
);

describe(
    'Delete User By Id',
    () => {

        beforeEach(
            () => {
                jest.clearAllMocks();
            });

        it(
            'Should to delete a user with sucess',
            async () => {

                const userRepository = new MongodbUserRepository();
                const persistedUser = UserPersistedBuilder.aUser().build();

                UserModel.findByIdAndDelete = jest.fn().mockResolvedValue(persistedUser);

                await expect(
                    userRepository.deleteUser(persistedUser.id)
                ).resolves.toHaveReturned;

                expect(UserModel.findByIdAndDelete).toHaveBeenCalledTimes(1);
            }
        );  
    }
);