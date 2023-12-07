import { GoogleAuth } from 'google-auth-library';
import { JSONClient } from 'google-auth-library/build/src/auth/googleauth';
import { google } from 'googleapis';
import { sheets_v4 } from 'googleapis/build/src/apis/sheets';
import dotenv from 'dotenv';
import { DateTime } from "luxon";

dotenv.config();

export class GoogleSheetProvider {
  // auth
  private auth: GoogleAuth<JSONClient>;

  // sheets
  private sheets: sheets_v4.Sheets;

  // range
  private range = 'ContactMessage!A2:L';
  private range2 = 'ContactMessageCompany!A2:L';

  constructor() {
    this.auth = new google.auth.GoogleAuth({
      scopes: 'https://www.googleapis.com/auth/spreadsheets',
    });

    this.sheets = google.sheets({ version: 'v4', auth: this.auth });
  }

  public async getMessages() {
    const res = await this.sheets.spreadsheets.values.get({
      range: this.range,
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
    });


    return res.data.values;
  }

  public async addMessage(message: [string, string, string, string, string, string, string, string, string, string, string]) {
  
    const res = await this.sheets.spreadsheets.values.append({
      range: this.range,
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [message],
      }
    });

    return res.data;
  }

  public async addCompanyMessage(message: [string, string, string, string, string, string, string, string, string, string, string]) {
    const res = await this.sheets.spreadsheets.values.append({
      range: this.range2,
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [message],
      }
    });

    return res.data;
  }
}