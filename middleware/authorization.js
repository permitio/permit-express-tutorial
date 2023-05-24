const { Permit } = require('permitio');

const permit = new Permit({
    token: process.env.PERMIT_SDK_SECRET,
    pdp: process.env.PDP_URL
});

const authorization = async ({ user: { username }, method, body, url }, res, next) => {
    const action = method.toLowerCase(),
        url_parts = url.split('/'),
        type = url_parts[1],
        key = url_parts[2] || null;
    const allowed = await permit.check(username, action, {
        type,
        key,
        attributes: body || {}
    });

    if (!allowed) {
        res.sendStatus(403);
        return;
    }
    next();
};

module.exports = authorization;