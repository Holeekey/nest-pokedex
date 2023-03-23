import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios, {AxiosInstance} from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { PokemonService } from '../pokemon/pokemon.service';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  constructor(
    private readonly pokemonService:PokemonService,

    private readonly http: AxiosAdapter,
  ){}

  async executeSeed(){

    try {
      const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650')
    
      const pokemonToInsert: {name:string,no:number}[] = [];

      const pokemonModel = this.pokemonService.pokemonModel

      await pokemonModel.deleteMany({})

      data.results.forEach(({name,url}) => {

        const segements = url.split('/');
        const no:number = +segements[segements.length - 2]
        //this.pokemonService.create({name,no})

        pokemonToInsert.push({name,no});

    })

    await pokemonModel.insertMany(pokemonToInsert)

    return 'Seed executed';

    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException()
    }
    
  }

}
