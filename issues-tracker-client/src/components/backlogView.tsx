import { Ticket } from '../../types'

type BacklogType = {
  list?: Ticket[];
}
const BacklogView = ({ list }: BacklogType) => {
  console.log(list, 'list!!!!!')
  return (
    <div>
      {list?.map((elem) => {
        return (
          <div>
            <div>{elem.issue}</div>
            <div>{elem.description}</div>
          </div>
        )
      })}
    </div>
  )
}

export default BacklogView