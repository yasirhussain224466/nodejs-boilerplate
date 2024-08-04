module.exports.defaultTemplate = ({
  content = "Line breaks and example URLs with additional sample text wrapping as per best practices.",
  buttonText = "Button",
  buttonLink,
}) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Email Template</title>
    <style>
      @media only screen and (max-width: 620px) {
        table[class="body"] {
          width: 100% !important;
        }
        table[class="container"] {
          width: 100% !important;
        }
        td[class="content"] {
          padding: 10px !important;
        }
      }
    </style>
  </head>
  <body
    style="background-color:#f1f1f1;font-family:Arial,sans-serif;color:#333;margin:0;padding:0;"
  >
    <center>
      <table
        class="body"
        width="100%"
        border="0"
        cellspacing="0"
        cellpadding="0"
        bgcolor="#ffffff"
      >
        <tr>
          <td align="center" valign="top">
            <table
              class="container"
              width="700"
              border="0"
              cellspacing="0"
              cellpadding="0"
              style="margin: 0 auto;"
            >
              <tr style="background-color: #0B1D34;">
                <td class="content" align="center" style="padding:20px;">
                  <img
                    src="https://XYZ-assets.s3.eu-north-1.amazonaws.com/Icon.png"
                    alt="The XYZ"
                    width="60"
                    style="margin: 20px"
                  />
                  <h1
                    style="color: #FFF; text-shadow: 0px 50px 50px rgba(0, 0, 0, 0.15);
          
          font-size: 12px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
          margin-bottom: 20px;
          letter-spacing: 6px;"
                  >
                    THE XYZ
                  </h1>
                </td>
              </tr>
              <tr>
                <td>
                  <div
                    style="margin: 15px;
                    font-size: 18px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 24px;
                    letter-spacing: 0.1px;"
                  >
                    ${content}
                  </div>
                </td>
              </tr>
              <tr>
                <td style="width: 100%;">
                  <a
                    href=${buttonLink}
                    style="background-color: #e46926;
                    color: #ffffff;
                    margin: 15px;
                    text-align: center;
                    border-radius: 6px;
                    width: -webkit-fill-available;
                    padding: 12px 24px;
                    text-decoration: none;
                    display: inline-block;
                    font-weight: bold;"
                  >
                    <span
                      style="color: #FFF;

text-align: center;
font-size: 18px;
font-style: normal;
font-weight: 600;
line-height: 24px;
letter-spacing: 0.5px;"
                      >${buttonText}</span
                    ></a
                  >
                </td>
              </tr>
              <tr>
                <td
                  class="content"
                  style="background-color: #0B1D34;text-align:center;padding:30px;"
                >
                  <div style="color:#ffffff;">
                    <a
                      href="#"
                      style="color:#ffffff;text-decoration:none;
                    margin-right: 0px;
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 24px; 
                    letter-spacing: 0.1px;"
                      >Contact</a
                    >
                    |
                    <a
                      href="#"
                      style="color:#ffffff;text-decoration:none; 
                    margin-right: 0px;
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 24px; 
                    letter-spacing: 0.1px;"
                      >Terms</a
                    >
                    |
                    <a
                      href="#"
                      style="color:#ffffff;text-decoration:none; 
                    margin-right: 0px;
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 24px; 
                    letter-spacing: 0.1px;"
                      >Privacy</a
                    >
                  </div>
                  <div
                    style="color:#ffffff;font-size:10px; text-align: center;
                  
                  font-size: 11px;
                  font-style: normal;
                  font-weight: 400;
                  line-height: 24px;
                  letter-spacing: 0.1px;"
                  >
                    Copyright ${new Date().getFullYear()} The XYZ
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </center>
  </body>
</html>
`;
