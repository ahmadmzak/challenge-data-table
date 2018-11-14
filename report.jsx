var React = require('react')
var ReactPivot = require('react-pivot')
var createReactClass = require('create-react-class')

var rows = require('./data.json')

var dimensions = [
    { value: 'date', title: 'Date' },
    { value: 'host', title: 'Host' }
]

var reduce = function(row, memo) {
    switch (row.type) {
        case 'impression':
            memo.impressionTotal = (memo.impressionTotal || 0) + 1
            break
        case 'load':
            memo.loadTotal = (memo.loadTotal || 0) + 1
            break
        case 'display':
            memo.displayTotal = (memo.displayTotal || 0) + 1
            break
    }
    return memo
}

var calculations = [
    // "value" can be the key of the "memo" object from reduce
    // "template" changes the display of the value, but not sorting behavior
    {
        title: 'Impressions',
        value: 'impressionTotal',
        template: function(val, row) {
            return val
        },
        className: 'alignRight'
    },
    {
        title: 'Loads',
        value: 'loadTotal',
        template: function(val, row) {
            return val
        },
        className: 'alignRight'
    },
    {
        title: 'Displays',
        value: 'displayTotal',
        template: function(val, row) {
            return val
        },
        className: 'alignRight'
    },
    {
        title: 'Load Rate',
        value: function(memo) {
            return (memo.loadTotal / memo.impressionTotal) * 100
        },
        template: function(val, row) {
            return val.toFixed(1) + '%'
        },
        className: 'alignRight'
    },
    {
        title: 'Dislplay Rate',
        value: function(memo) {
            return (memo.displayTotal / memo.loadTotal) * 100
        },
        template: function(val, row) {
            return val.toFixed(1) + '%'
        },
        className: 'alignRight'
    }
]

module.exports = createReactClass({
    render() {
        return (
            <ReactPivot
                rows={rows}
                dimensions={dimensions}
                reduce={reduce}
                calculations={calculations}
            />
        )
    }
})
