import { Ticket } from '../../types'

type BacklogType = {
  list?: Ticket[];
  openModalWithData: (something: any) => void;
}

const BacklogView = ({ list, openModalWithData }: BacklogType) => {
  console.log(list, 'list!!!!!')
  return (
    <div>
      {list?.map((elem) => {
        return (
          <div>
            <input type="text" value={elem.issue} onClick={openModalWithData} />
            <div>{elem.description}</div>
          </div>
        )
      })}
    </div>
  )
}

export default BacklogView