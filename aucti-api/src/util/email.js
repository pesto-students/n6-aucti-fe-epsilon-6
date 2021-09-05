const email = (product, bid) =>
	`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aucti</title>
</head>
<body>
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
    
    
        <tr>
            <td align="center" bgcolor="#ffffff">
    
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                    <tr>
                        <td align="center" valign="top" width="600">
    
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                <tr>
                                    <td align="center" valign="top" style="padding: 36px 24px;">
                                        <a href="" target="_blank" style="display: inline-block;">
                                            <img src="https://firebasestorage.googleapis.com/v0/b/auctiweb.appspot.com/o/Logo%20(2).png?alt=media&token=6d7c1b12-30a3-44be-b344-856f9bf9e8d2"
                                                alt="Logo" border="0" height="48" style="display: block; ">
                                        </a>
                                    </td>
                                </tr>
                            </table>
    
                        </td>
                    </tr>
                </table>
    
            </td>
        </tr>
    
        <tr>
            <td align="center" bgcolor="#ffffff">
    
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                    <tr>
                        <td align="center" valign="top" width="600">
    
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                <tr>
                                    <td align="center" bgcolor="#f0b90b"
                                        style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
                                        <h1
                                            style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">
                                            You have selected as Highest Bidder!</h1>
                                    </td>
                                </tr>
                            </table>
    
                        </td>
                    </tr>
                </table>
    
            </td>
        </tr>
    
    
    
        <tr>
            <td align="center" bgcolor="#ffffff">
    
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                    <tr>
                        <td align="center" valign="top" width="600">
    
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
    
    
                                <tr>
                                    <td align="left" bgcolor="#f0b90b"
                                        style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                                        <p style="margin: 0;">You have been selected as highest bidder for the product ${product.title}, Please pay the bidded amount ₹ ${bid.bid_price} by clicking the below button to complete the payment!</p>
                                    </td>
                                </tr>
    
                                <tr>
                                    <td align="left" bgcolor="#f0b90b">
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                            <tr>
                                                <td align="center" bgcolor="#f0b90b" style="padding: 12px;">
                                                    <table border="0" cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <td align="center" bgcolor="#1a82e2"
                                                                style="border-radius: 6px;">
                                                                <a href="http://localhost:3000/payments/${bid.id}"
                                                                    target="_blank"
                                                                    style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">Pay
                                                                    Now</a>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
    
                                <tr>
                                    <td align="left" bgcolor="#f0b90b"
                                        style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
                                        <p style="margin: 0;">Cheers,<br> Aucti</p>
                                    </td>
                                </tr>
    
    
                            </table>
    
                        </td>
                    </tr>
                </table>
    
            </td>
        </tr>
    
        <tr>
            <td align="center" bgcolor="#ffffff" style="padding: 24px;">
    
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                    <tr>
                        <td align="center" valign="top" width="600">
    
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
    
    
                                <tr>
                                    <td align="center" bgcolor="#ffffff"
                                        style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                                        <p style="margin: 0;">You received this email because we received a bid for the
                                            product. If you didn't bid you can safely delete this email.</p>
                                    </td>
                                </tr>
    
    
                            </table>
    
                        </td>
                    </tr>
                </table>
    
            </td>
        </tr>
    
    
    </table>
</body>
</html>`;

module.exports = { email };
