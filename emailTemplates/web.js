module.exports.defaultTemplate = ({
  content = "Line breaks and example URLs with additional sample text wrapping as per best practices.",
  buttonText = "Button",
  buttonLink,
}) => `<!doctype html>
<html lang=en>
<head>
<meta charset=UTF-8>
<meta name=viewport content="width=device-width,initial-scale=1">
<title>Email Template</title>
</head>
<body style=background-color:#f1f1f1;font-family:Arial,sans-serif;color:#333;margin:0;padding:20px>
<center>
<table width=700 border=0 cellspacing=0 cellpadding=0 bgcolor=#ffffff>
<tr>
<td align=center valign=top>
<table border=0 cellspacing=0 cellpadding=0 style="padding:50px 0 0 0">
<tr align=center style="border:1px solid red;padding:10px;font-size:16px;line-height:20px">
<td align=center style=width:fit-content;padding:10px;font-size:16px;line-height:20px>
<img src="https://XYZ-assets.s3.eu-north-1.amazonaws.com/XYZ_logo_black_text(1)+(1).png" alt="The XYZ" width=70 style=display:block>
</td>
<td align=center style=padding:10px;font-size:16px;line-height:20px>
<h1 style=font-size:24px;margin:0>THE XYZ</h1>
</td>
</tr>
</table>
<table width=700 border=0 cellspacing=0 cellpadding=0>
<tr>
<td align=center style="padding:20px 0"></td>
</tr>
<tr>
<td style="padding:10px 50px;font-size:16px;line-height:20px">
<p>
${content}
</p>
</td>
</tr>
<tr>
<td style="padding:0px 0 60px 50px">
${
  buttonLink
    ? `<a href=${buttonLink} style="background-color:#e46926;color:#000;padding:10px 40px;text-decoration:none;border-radius:20px;display:inline-block;font-weight:700;font-size:12px;box-shadow:0 4px 8px 0 rgba(0,0,0,.8),0 6px 20px 0 rgba(0,0,0,.19)">${buttonText}</a>`
    : ""
}
</td>
</tr>
<tr style=padding-top:40px>
<td style="padding:30px 0;line-height:22px;text-align:inherit;background-color:#000" height=100% valign=top bgcolor=black role=module-content>
<div>
<div style=font-family:inherit;text-align:center>
<a style=text-decoration:none href=# target=_blank><span style=font-size:12px;color:#fff>Contact
</span></a><span style=font-size:12px;color:#fff>| </span><a style=text-decoration:none href=#><span style=font-size:12px;color:#fff>Terms
</span></a><span style=font-size:12px;color:#fff>| </span><a style=text-decoration:none href=#><span style=font-size:12px;color:#fff>Privacy</span></a>
</div>
<div style=font-family:inherit;text-align:center>
<span style=color:#fff;font-size:10px;font-style:normal;font-variant-ligatures:normal;font-variant-caps:normal;font-weight:400;letter-spacing:normal;orphans:2;text-align:center;text-indent:0;text-transform:none;widows:2;word-spacing:0px;-webkit-text-stroke-width:0px;text-decoration-thickness:initial;text-decoration-style:initial;text-decoration-color:initial;float:none;display:inline;font-family:arial,helvetica,sans-serif;background-color:94c2>
Copyright ${new Date().getFullYear()} The XYZ</span><span style=font-family:arial,helvetica,sans-serif;background-color:94c2>&nbsp;</span>
</div>
<div></div>
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
