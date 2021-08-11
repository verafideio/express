const { digest } = require('./utils');

describe('app utils', () => {
    it('creates a digest', () => {
        const result = digest(
            'app-key',
            'https://localhost/wp-admin/admin-ajax.php?zone=webhook&action=artisan&token=tokA',
        );

        expect(result).toEqual('app-key:https://localhost/wp-admin/admin-ajax.php?action=artisan&token=tokA&zone=webhook');
    });
    it('creates a digest (with port)', () => {
        const result = digest(
            'app-key',
            'https://localhost:3000/wp-admin/admin-ajax.php?zone=webhook&action=artisan&token=tokA',
        );

        expect(result).toEqual('app-key:https://localhost:3000/wp-admin/admin-ajax.php?action=artisan&token=tokA&zone=webhook');
    });
});
