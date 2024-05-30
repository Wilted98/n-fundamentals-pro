import { Body, Controller, Delete, Get, HttpStatus, Inject, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song-dto';
import { Connection } from 'src/common/constants/connection';

@Controller('songs')
export class SongsController {

    constructor(private songService: SongsService, @Inject('CONNECTION') private connection: Connection) { 
    }

    @Post()
    create(@Body() CreateSongDTO: CreateSongDTO): CreateSongDTO[] {
        const results = this.songService.create(CreateSongDTO);
        return results;
    }

    @Get()
    findAllT() {
        return this.songService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id: number) {
        return `fetch song based on the id ${id}`
    }

    @Put(':id')
    update() {
        return 'update song based on id'
    }

    @Delete(':id')
    delete() {
        return 'Delete song on the based id'
    }

}
