deleteEvent = () => {
  const id = this.props.match.params.id
  axios({
    method: 'DELETE',
    url: `https://library-express-api.herokuapp.com/events/${id}`
  })
    .then(response => {
      this.setState({
        deleted: true
      })
    })
    .catch(console.error)
}
