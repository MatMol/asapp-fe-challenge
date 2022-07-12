const citiesAction = (cities: any = []) => {
    return {
      cities: cities,
      type: 'UPDATE'
    }
}

export default citiesAction;