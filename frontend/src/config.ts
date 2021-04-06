/* React environment configuration (frontend only) */

const prod = {
    env: 'production',
    api_host: '' 
};
const dev = {
    env: 'development',
    api_host: 'http://localhost:5000', // web server localhost port
    use_frontend_test_user: false, 
    user: "test@user.com"
};

export default process.env.NODE_ENV === 'production' ? prod : dev;