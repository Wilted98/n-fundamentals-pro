import { All, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { LoggerModule } from './common/middleware/logger/logger.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { SongsController } from './songs/songs.controller';
import { DevConfigService } from './common/providers/DevConfigService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Song } from './songs/song.entity';

const devConfig = {
  port: 3000
  };
  const proConfig = {
  port: 400
  };

@Module({
  imports: [SongsModule, LoggerModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'spotify',
      entities: [Song],
      synchronize: true,
      }),
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: DevConfigService,
    useClass: DevConfigService
  }, {
    provide: 'CONFIG',
    useFactory: () => {
      return process.env.NODE_ENV  === 'development' ? devConfig : proConfig
    }
  }],
})
export class AppModule implements NestModule {

  constructor(private dataSource: DataSource){
    console.log(dataSource.driver.database)
  }

  configure(consumer: MiddlewareConsumer) {

    consumer.apply(LoggerMiddleware).forRoutes({path: 'songs', method: RequestMethod.ALL});

  }

}
