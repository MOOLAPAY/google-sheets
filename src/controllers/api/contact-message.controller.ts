import { Request, Response } from "express";
import { GoogleSheetProvider } from "../../providers/google-sheet.provider";
import { sendMail } from "../../services/mail.service";
import { ContactMessageMail } from "../../templates/contact-message.mail";

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, company_size, message } = req.body;
    // validate required fields
    if (!name || !email || !phone || !message)
      return res.status(400).send({ message: "error_required_fields" });
    // validate fields not empty
    if (!name.trim() || !email.trim() || !phone.trim() || !company_size.trim() || !message.trim())
      return res.status(400).send({ message: "error_no_empty_fields" });
    // validate email
    const re = /\S+@\S+\.\S+/;
    if (!re.test(email))
      return res.status(400).send({ message: "error_invalid_email" });
    // validate phone: +96512345678
    const rePhone = /^\+\d{12,14}$/;
    if (!rePhone.test(phone))
      return res.status(400).send({ message: "error_invalid_phone" });

    // send email
    sendMail(ContactMessageMail(req));

    // save to google sheet
    const googleSheets = new GoogleSheetProvider();
    await googleSheets.addMessage([name, email, phone, company_size, message]);

    res.send({ message: "OK" });
    return;
  } catch (error) {
    console.log("error", error);
    res.status(500).send({ message: "server_error" });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    const googleSheets = new GoogleSheetProvider();
    const messages = await googleSheets.getMessages();
    res.send({ message: "OK", data: messages });
    return;
  } catch (error) {
    console.log("error", error);
    res.status(500).send({ message: "server_error" });
  }
};