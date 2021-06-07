using System;
using System.Net.Mail;

namespace SMSand_EMAILService.cs
{
    public static class EmailService
    {

        public static string EmailSend(string emailID, string fullname,string cmpname,string message)
        {
            MailMessage mail = new MailMessage();
            SmtpClient SmtpServer = new SmtpClient("wynkemr.com");
            mail.From = new MailAddress("support@wynkemr.com");
            mail.To.Add(emailID);
            mail.Subject = cmpname;
            mail.Body += "Hi " + fullname + ',' + "<br />" + message + ' ' + cmpname;
            mail.IsBodyHtml = true;
            SmtpServer.Port = 587;
            SmtpServer.UseDefaultCredentials = false;
            SmtpServer.Credentials = new System.Net.NetworkCredential("support@wynkemr.com", "Supp0rt@321");
            SmtpServer.EnableSsl = true;
            SmtpServer.Send(mail);
            return fullname;

            //MailMessage mail = new MailMessage();
            //SmtpClient SmtpServer = new SmtpClient("cmps.in");
            //mail.From = new MailAddress("support@cmps.in");
            //mail.To.Add(emailID);
            //mail.Subject = cmpname;
            //mail.Body += "Hi " + fullname + ',' + "<br />" + message + ' ' + cmpname;
            //mail.IsBodyHtml = true;
            //SmtpServer.Port = 587;
            //SmtpServer.UseDefaultCredentials = false;
            //SmtpServer.Credentials = new System.Net.NetworkCredential("support@cmps.in", "Supp0rt@123");
            //SmtpServer.EnableSsl = true;
            //SmtpServer.Send(mail);
            //return fullname;


        }



        /////////////////////////////////////////////////////////////sms services///////////////////////////////////////////////




    }
}
