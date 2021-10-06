import { injectable } from "tsyringe";
import { IMailProvider } from "../IMailProvider";
import aws from "aws-sdk";
import nodemailer, { Transporter } from "nodemailer";
import handlebars from "handlebars";
import fs from "fs";

@injectable()
class SESMailProvider implements IMailProvider {
  private client: Transporter;
  constructor() {
    this.client = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: "2010-12-01",
        region: process.env.AWS_REGION,
      }),
    });
  }
  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString("utf-8");

    const templateParse = handlebars.compile(templateFileContent);

    const templateHTML = templateParse(variables);

    await this.client.sendMail({
      to,
      from: "Rentx <contact@luccasbarros.dev>",
      subject,
      html: templateHTML,
    });
  }
}

export { SESMailProvider };
