/* eslint-disable */
const { Layout } = require('./src/components/Layout')
const React = require('react')

function wrapPageElement({ element }) {
  return (
    <Layout>{element}</Layout>
  )
}

exports.wrapPageElement = wrapPageElement
