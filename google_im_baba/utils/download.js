
var arggs = {
    'keyword':'lion',
    'limit':'2'
}
const download =(argg) => {

    var url = `http://192.168.43.159:3000/images?keyword=${argg['keyword']}&limit=${argg['limit']}`
     console.log(url)
               return fetch(url,{
                    method: "GET",
                })
                .then(res => res.json())
                
    }

export default download;