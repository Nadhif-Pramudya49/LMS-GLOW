const db = require('./config/db');
const bcrypt = require('bcryptjs');

async function seed() {
    try {
        console.log('Starting seed...');
        
        // Hash passwords
        const adminPass = await bcrypt.hash('admin123', 10);
        const librarianPass = await bcrypt.hash('pustakawan123', 10);
        const memberPass = await bcrypt.hash('anggota123', 10);

        // Insert Admin
        await db.execute(
            'INSERT IGNORE INTO users (username, password, name, role) VALUES (?, ?, ?, ?)',
            ['admin', adminPass, 'System Admin', 'ADMIN']
        );

        // Insert Librarian
        await db.execute(
            'INSERT IGNORE INTO users (username, password, name, role) VALUES (?, ?, ?, ?)',
            ['pustakawan', librarianPass, 'Andi Pustakawan', 'LIBRARIAN']
        );

        // Insert Member
        await db.execute(
            'INSERT IGNORE INTO users (username, password, name, role) VALUES (?, ?, ?, ?)',
            ['anggota', memberPass, 'Budi Anggota', 'MEMBER']
        );

        console.log('Seeding completed successfully.');
        process.exit();
    } catch (err) {
        console.error('Error seeding data:', err);
        process.exit(1);
    }
}

seed();
