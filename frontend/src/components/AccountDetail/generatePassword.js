const randomPasswords = ['1JFV/G$[h2ky/`~RA', '2*W!9A3CjLCz2avRS', '3-w4fSes89PRP!_@*', '4qR7+@vM^Sx4vaN6Z']

function generateRandomPassword() {
    const randomIndex = Math.floor(Math.random() * (randomPasswords.length - 1));
    return randomPasswords[randomIndex];
}

export default generateRandomPassword;