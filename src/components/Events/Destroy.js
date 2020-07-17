deleteKickback = () => {
  const id = this.props.match.params.id
  axios({
    method: 'DELETE',
    url: `https://library-express-api.herokuapp.com/kickbacks/${id}`
  })
    .then(response => {
      this.setState({
        deleted: true
      })
    })
    .catch(console.error)
}
