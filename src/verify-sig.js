const { digest, base64UrlEncode } = require('./utils');
const { createHash, createHmac } = require('crypto');

/**
 * Middleware to check the signature on the callbackUrl endpoint
 * @param {string} appKey Verafide appKey
 * @param {string} appSecret Verafide appSecret
 * @returns void
 */
exports.verifySignature = (appKey, appSecret) => (req, res, next) => {
    const signature = req.query.signature;

    const qs = new URLSearchParams();
    for (const key in req.query) {
        if (key === 'signature') {
            continue;
        }
        qs.set(key, req.query[key]);
    }
    const qsStr = qs.toString();
    const fullUrl = `${req.protocol}://${req.headers.host}${req.path}${qsStr.length ? `?${qsStr}` : ''}`;
    const digestStr = digest(appKey, fullUrl);
    const sig = base64UrlEncode(createHmac(
        'sha256',
        appSecret
    ).update(
        createHash('sha256')
            .update(digestStr)
            .digest()
            .toString('hex')
    ).digest().toString('hex'));

    res.locals.signatureVerified = signature === sig;

    next();
}