import { Request } from "express";


export const ContactMessageMail = (req: Request) => ({
  from: `${req.body.name} <${req.body.email}>`,
  to: `Moola Pay <info@moolapay.io>`,
  subject: `Contact Message: ${req.body.name}`,
  text: `
  <table>
    <tr>
      <td>Name</td>
      <td>${req.body.name}</td>
    </tr>
    <tr>
      <td>Email</td>
      <td>${req.body.email}</td>
    </tr>
    <tr>
      <td>Phone</td>
      <td>${req.body.phone}</td>
    </tr>
    <tr>
      <td>Company Size</td>
      <td>${req.body.company_size ?? 'Not Provided'}</td>
    </tr>
    <tr>
      <td>Message</td>
      <td>${req.body.message ?? ''}</td>
    </tr>
    <tr>
    <td>UTM Source</td>
    <td>${req.body.utm_source ?? 'Not Provided'}</td>
  </tr>
  <tr>
    <td>UTM Medium</td>
    <td>${req.body.utm_medium ?? 'Not Provided'}</td>
  </tr>
  <tr>
    <td>UTM Campaign</td>
    <td>${req.body.utm_campaign ?? 'Not Provided'}</td>
  </tr>
  <tr>
    <td>UTM Term</td>
    <td>${req.body.utm_term ?? 'Not Provided'}</td>
  </tr>
  <tr>
    <td>UTM Content</td>
    <td>${req.body.utm_content ?? 'Not Provided'}</td>
  </tr>
  `
})