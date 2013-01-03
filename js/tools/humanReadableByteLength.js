//tools to convert obtuse bytelength to readable formate such as 123455 -> 123 KB
define({

    calcHumanReadableSize: function(bytes){
        var sizeMap = {
            3 : "KB"
            , 6 : "MB"
            , 9 : "GB"
            , 12: "TB"
            , 15: "PB"
        }

        var placeCount = bytes.toString().length
        , humanReadableSizes = _.filter(sizeMap, function(name, key){ return placeCount > key })

        if (humanReadableSizes.length > 0) return _.last(humanReadableSizes)
        else return "Bytes"
    },

    //only return the top 3 numbers of the bytes so 123456 would just be 123
    truncateBytes: function(bytes){
        var byteLength = bytes.toString().length

        if (byteLength <= 3){
            return bytes.toString().substr(0,3)
        }else{
            return this.truncateBytes( parseInt(bytes.toString().substr(0,byteLength-3)))
        }
    },

    prettyFormat: function(bytes){
        var sizeUnit = this.calcHumanReadableSize(bytes)
        , truncatedBytes = this.truncateBytes(bytes)

        return truncatedBytes + " " + sizeUnit

    }
})
