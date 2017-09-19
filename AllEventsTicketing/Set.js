function Set() {

  this.intersection = function (listA, listB) {
    // Return if null values exist
    if (listA === null || listB === null) {
      return null
    }
    //calculate the result list
    var resultList = [];
    listA.forEach(function (eachA) {
      listB.forEach(function (eachB) {
        if (eachA === eachB) {
          resultList.push(eachB)
        }
      })
    })
    return resultList;
  }

  this.union = function (listA, listB) {
    // Return if null values exist
    if (listA === null || listB === null) {
      return null
    }
    //calculate the result list
    var resultList = [];
    resultList.push.apply(resultList, this.relativeComplement(listA, listB))
    resultList.push.apply(resultList, this.intersection(listA, listB))
    resultList.push.apply(resultList, this.relativeComplement(listB, listA))
    return resultList;
  }

  this.relativeComplement = function (listA, listB) {
    // Return if null values exist
    if (listA === null || listB === null) {
      return null
    }
    //calculate the result list
    var resultList = [];
    listA.forEach(function (eachA) {
      var skip = false
      listB.forEach(function (eachB) {
        if (eachA === eachB) {
          skip = true;
        }
      })
      if (!skip) {
        resultList.push(eachA)
      }
    })
    return resultList;
  }

  this.symmetricDifference = function (listA, listB) {
    // Return if null values exist
    if (listA === null || listB === null) {
      return null
    }
    //calculate the result list
    var resultList = [];
    resultList.push.apply(resultList, this.relativeComplement(listA, listB))
    resultList.push.apply(resultList, this.relativeComplement(listB, listA))
    return resultList;
  }
}
