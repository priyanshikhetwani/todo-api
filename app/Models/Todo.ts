import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, computed, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import authConfig from 'Config/auth'
import User from './User'


export default class Todo extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId:number

  @column()
  public title:string

  @column()
  public is_completed:boolean

  @column.dateTime({ autoCreate: true, serialize: (value:DateTime)=> value.toFormat('yyyy LLL dd') })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serialize: (value:DateTime)=> value.toFormat('yyyy LLL dd') })
  public updatedAt: DateTime



  @belongsTo(()=> User, {
    // localKey: 'user_id'
  })
  public user: BelongsTo<typeof User>
}
