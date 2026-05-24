const nodemailer = require("nodemailer");

// Create transporter for sending emails
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Send booking confirmation email
const sendBookingConfirmation = async (booking) => {

    // Create date object
    const bookingDate = new Date(booking.startTime);

    // Format date
    const formattedDate = bookingDate.toLocaleDateString("sv-SE");

    // Format time
    const formattedTime = bookingDate.toLocaleTimeString("sv-SE", {
        hour: "2-digit",
        minute: "2-digit",
    });


    // Email options
    const mailOptions = {
        from: process.env.EMAIL_USER,

        to: booking.email,

        subject: `Bokningsbekräftelse - ${booking.bookingNumber}`,

        html: `
            <h2>Tack för att du väljer Neo Tokyo Kitchen</h2>

            <p>Vi har tagit emot din bokning.</p>

            <ul>
                <li><strong>Bokningsnummer:</strong> ${booking.bookingNumber}</li>
                <li><strong>Datum och tid:</strong> ${formattedDate} Kl. ${formattedTime}</li>
                <li><strong>Antal gäster:</strong> ${booking.guests}</li>
                <li><strong>Status:</strong> ${booking.status}</li>
            </ul>

            <p>
                Om du behöver ändra eller avboka din bokning, 
                vänligen kontakta restaurangen och ange ditt bokningsnummer.
            </p>
        `,
    };

    // Send email
    await transporter.sendMail(mailOptions);
};


// Send booking cancellation email
const sendBookingCancellation = async (booking) => {

    // Create date object
    const bookingDate = new Date(booking.startTime);

    // Format date
    const formattedDate = bookingDate.toLocaleDateString("sv-SE");

    // Format time
    const formattedTime = bookingDate.toLocaleTimeString("sv-SE", {
        hour: "2-digit",
        minute: "2-digit",
    });

    // Email options
    const mailOptions = {
        from: process.env.EMAIL_USER,

        to: booking.email,

        subject: `Avbokningsbekräftelse - ${booking.bookingNumber}`,

        html: `
            <h2>Er bordsbokning är avbokad.</h2>

            <p>Vi bekräftar härmed att Er bordsbokning hos Neo Tokyo Kitchen har avbokats.</p>

            <ul>
                <li><strong>Bokningsnummer:</strong> ${booking.bookingNumber}</li>

                <li>
                    <strong>Datum och tid:</strong>
                    ${formattedDate} Kl. ${formattedTime}
                </li>

                <li><strong>Antal gäster:</strong> ${booking.guests}</li>
                <li><strong>Status:</strong> ${booking.status}</li>
            </ul>

            <p>
                Kontakta oss gärna om du vill göra en ny bokning.
            </p>
        `,
    };

    // Send email
    await transporter.sendMail(mailOptions);
};

// Export service
module.exports = {
    sendBookingConfirmation,
    sendBookingCancellation,
};