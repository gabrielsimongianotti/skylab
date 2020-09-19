export default interface IParserMailTemplateDTO {
  file: string;
  variables: ITemplateVariables;
}
interface ITemplateVariables {
  [key: string]: string | number;
}
