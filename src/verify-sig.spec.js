const { verifySignature } = require('./verify-sig');

describe('verifySig', () => {
    let req;
    let res;
    let next;
    const appKey = 'sJwamL_iIvZclklp3MZ-sTOXBt_IF76pUJ5zOjHiLLw';
    const appSecret = 'l1hlgE0DFbVUZzFKwcM9bnd6rHHZReUqN9K5RClqsaA';
    beforeEach(() => {
        req = {
            protocol: 'http',
            headers: {
                host: 'localhost:8000',
            },
            path: '/verafideCallback',
            query: {
                token: 'nltuONVxb8fYCO1o',
                signature: 'NGI0ZWQ5ZGIxOTY5MGQ1MWZjOTBiYzA0MjAzODE0MTFhMGE0MjI5YTBhM2MwZGQwZTUwZmUxOGY4MjJmYjc5MA',
            }
        };
        res = { locals: {} };
        next = jest.fn();
    });
    it('next is called', () => {
        verifySignature(appKey, appSecret)(req, res, next);

        expect(next.mock.calls.length).toBe(1);
    });
    it('res.locals.signatureVerified is false when incorrect appKey specified', () => {
        verifySignature('', appSecret)(req, res, next);

        expect(res.locals.signatureVerified).toBe(false);
    });
    it('res.locals.signatureVerified is false when incorrect appSecret specified', () => {
        verifySignature(appKey, '')(req, res, next);

        expect(res.locals.signatureVerified).toBe(false);
    });
    it('res.locals.signatureVerified is true when correct appKey and appSecret specified', () => {
        verifySignature(appKey, appSecret)(req, res, next);

        expect(res.locals.signatureVerified).toBe(true);
    });
});