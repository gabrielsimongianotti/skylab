import IParseMailTemplateDTO from '@shared/container/provider/MailTemplateProvider/dtos/IParserMailTemplateDTO';

export default interface IMailTemplateProvider {
  parse(data: IParseMailTemplateDTO): Promise<string>;
}
