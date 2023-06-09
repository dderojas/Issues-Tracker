type BacklogType = {
  list: [string];
}
const BacklogView = ({ list }: BacklogType) => {
  console.log(list, 'list!!!!!')
  return (
    <div>
      helooooooo
      {/*
      // @ts-ignore */}
      {list.map((elem) => {
        return <div>{elem}</div>
      })}
    </div>
  )
}

export default BacklogView