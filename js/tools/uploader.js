/*
 * Copyright (c) 2008-2009, Ionut Gabriel Stan. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 *    * Redistributions of source code must retain the above copyright notice,
 *      this list of conditions and the following disclaimer.
 *
 *    * Redistributions in binary form must reproduce the above copyright notice,
 *      this list of conditions and the following disclaimer in the documentation
 *      and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */


//helper tool to send files 
var Uploader = function() {
};

Uploader.prototype = {
    headers : {},

    /**
     * @return String
     */
    generateBoundary : function() {
        return "---------------------------" + (new Date).getTime();
    },

    /**
     * @param  String boundary
     * @return String
     */
    buildMessage : function(fileName, binaryData, boundary) {
        var data = '';
        var CRLF  = "\r\n";

        /*
         * Content-Disposition header contains name of the field used
         * to upload the file and also the name of the file as it was
         * on the user's computer.
         */
        fieldName = 'file'
        data += 'Content-Disposition: form-data; ';
        data += 'name="' + fieldName + '"; ';
        data += 'filename="'+ fileName + '"' + CRLF;

        /*
         * Content-Type header contains the mime-type of the file to
         * send. Although we could build a map of mime-types that match
         * certain file extensions, we'll take the easy approach and
         * send a general binary header: application/octet-stream.
         */
        data += "Content-Type: application/octet-stream" + CRLF + CRLF;

        /*
         * File contents read as binary data, obviously
         */
        data += binaryData + CRLF;


        var request = "--" + boundary + CRLF;
            //request+= parts.join("--" + boundary + CRLF);
            request+= data;
            request+= "--" + boundary + "--" + CRLF;

        return request;
    },

    buildMessageForMultipleBlobs: function(){
    },

    /**
     * @return null
     */
    send : function(location, binaryData, fileName, callback) {
        var boundary = this.generateBoundary();
        var xhr      = new XMLHttpRequest();

        xhr.open("POST", location, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                callback(xhr.responseText);
            }
        };

        var contentType = "multipart/form-data; boundary=" + boundary;
        xhr.setRequestHeader("Content-Type", contentType);

        for (var header in this.headers) {
            xhr.setRequestHeader(header, headers[header]);
        }

        // finally send the request as binary data
        xhr.send(this.buildMessage(fileName,binaryData, boundary));
    },

    sendForMultipleBlobs: function(){
    }
};

//define for requirejs
define(function(){return Uploader});
