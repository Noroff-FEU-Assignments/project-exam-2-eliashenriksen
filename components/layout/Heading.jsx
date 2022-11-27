export default function Heading({ title }) {


  if (title) {
    return(
      <h1>{title}</h1>
    )
  } else {
    return(
      ""
    )
  }

}