export interface IUseCase<InputDto, OutputDto> {
    execute(input: InputDto): Promise<OutputDto>;
}