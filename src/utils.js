const { URL } = require('url');

exports.digest = (appKey, url) => {
    const parsedUrl = new URL(url);
    const qs = new URLSearchParams(parsedUrl.search);
    qs.sort();

    const qsString = qs.toString();

    const uri = `${parsedUrl.protocol}//${parsedUrl.hostname}${parsedUrl.port ? `:${parsedUrl.port}` : ''}${parsedUrl.pathname}${qsString.length ? `?${qsString}` : ''}`;

    return `${appKey}:${uri}`;
};

const ENC = {
    '+': '-',
    '/': '_',
    '=': '',
}
exports.base64UrlEncode = (str) => Buffer.from(str).toString('base64').replace(/[+/=]/g, (m) => ENC[m]);