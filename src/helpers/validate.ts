function validate(request) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        return false;
    }

    const auth = authHeader.split(' ')[1];

    if (!auth) {
        return false;
    }

    const [email, password] = auth.split(':');

    if (!email || !password) {
        return false;
    }
    return true;
}
export default validate;