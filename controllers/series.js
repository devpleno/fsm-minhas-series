// const Serie = require('../models/series')

const labels = [
  { id: 'to-watch', name: 'Para assistir' },
  { id: 'watching', name: 'Assistindo' },
  { id: 'watched', name: 'Assistido' },
]

const index = ({ Serie }, req, res) => {
  // Serie.find({}, (err, docs) => res.send(docs))
  // res.render('series/index')
  Serie.find({}, (err, docs) => {
    // res.render('series/index', { series: docs })
    res.render('series/index', { series: docs, labels })
  })
}
// const nova = (req, res) => res.render('series/nova')
// const novaProcess = ({ Serie }, req, res) => {
//   const serie = new Serie({
//     name: 'Friends',
//     status: 'watched'
//   })
//   serie.save(() => console.log('saved'))
//   res.render('series/nova')
// }
const novaProcess = ({ Serie }, req, res) => {
  const serie = new Serie(req.body)
  serie.save(() => {
    res.redirect('/series')
  })
}

const novaForm = (req, res) => {
  res.render('series/nova')
}

const excluir = ({ Serie }, req, res) => {
  Serie.remove({
    _id: req.params.id
  }, (err) => {
    res.redirect('/series')
  })
}

const editarProcess = ({ Serie }, req, res) => {
  Serie.findOne({ _id: req.params.id }, (err, serie) => {
    serie.name = req.body.name
    serie.status = req.body.status
    serie.save()
    res.redirect('/series')
  })
}

const editarForm = ({ Serie }, req, res) => {
  // const labels = [
  //   { id: 'to-watch', name: 'Para assistir' },
  //   { id: 'watching', name: 'Assistindo' },
  //   { id: 'watched', name: 'Assistido' },
  // ]
  Serie.findOne({ _id: req.params.id }, (err, serie) => {
    res.render('series/editar', { serie, labels })
  })
}

module.exports = {
  index, novaProcess, novaForm, excluir, editarForm, editarProcess
}