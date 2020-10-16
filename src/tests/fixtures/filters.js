import moment from 'moment'

const defaultFilters = {
    text: '',
    sortBy:'date',
    startDate : undefined,
    endDate : undefined
}

const filters = {
    text: 'bills',
    sortBy:'amount',
    startDate : moment(0),
    endDate : moment(0).add( 3 ,'days')
}

export { filters , defaultFilters } ;