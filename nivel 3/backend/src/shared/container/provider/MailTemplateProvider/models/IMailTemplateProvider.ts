import IParseMailTemplateDTO from '../dtos/IParserMailTemplateDTO';

export default interface IMailTemplateProvider {
  parse(data: IParseMailTemplateDTO): Promise<string>;
}
