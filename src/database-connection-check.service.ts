import { Injectable, OnModuleInit } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class DatabaseConnectionCheckService implements OnModuleInit {
    constructor(
        @InjectDataSource() private readonly dataSource: DataSource
    ) {}

    async onModuleInit() {
        try {
            console.log('Database Connection Check Service:');
            console.log('DB_HOST:', process.env.PG_HOST);
            console.log('DB_USER:', process.env.PG_USER);
            console.log('DB_PASSWORD:', process.env.PG_PASSWORD);
            console.log('DB_NAME:', process.env.PG_DATABASE);

            const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
            await queryRunner.connect();
            await queryRunner.query('SELECT 1');
            await queryRunner.release();

            console.log('Database connection is healthy');
        } catch (error) {
            console.error('Database connection is not healthy:', error);
        }
    }
}
