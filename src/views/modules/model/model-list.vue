<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="6" v-for="item in modellist" :key="item.id">
                    <router-link target="_blank" :to="{path:'/model',query:{type:item.type,code:item.code,url:item.jsondata}}">
                        <el-card class="box-card">
                                <div slot="header" class="clearfix">
                                    <span class="headertitle">{{item.title}}</span>
                                </div>
                                <div  class="text item">
                                    <div class="modelimg"><img :src="item.img"></div>
                                    <p class="introducemodel">{{item.introduce}}</p>
                                </div>
                        </el-card>
                    </router-link>
            </el-col>
        </el-row>
    </div>
    
    
</template>
  
<script>
    
    export default {
        data () {
            return {
                modellist:[
                    {
                        "id":1,
                        "title":"结构模型",
                        // "img":"/../static/img/model_1.png",
                        "img":require("@/assets/img/model_1.png"),
                        "introduce":"简介简介简介简介简介简介简介简介",
                        "jsondata":"http://222.184.237.179:8088/PPP/PPPList.json",
                        "type":7,
                        "code":9
                    },
                    {
                        "id":2,
                        "title":"实体模型",
                        "img":require("@/assets/img/model_2.png"),
                        "introduce":"简介",
                        "jsondata":"http://222.184.237.179:8088/14BIM0919/14BIM0919List.json",
                        "type":6,
                        "code":8
                    },
                    {
                        "id":3,
                        "title":"建筑模型",
                        "img":require("@/assets/img/model_3.png"),
                        "introduce":"简介",
                        "jsondata":"http://222.184.237.179:8088/hotel/hotelList.json",
                        "type":9,
                        "code":11
                    },
                ]
            }
    
         
        }
        
    }
    
    
</script>

<style  lang="scss" scoped>
   .headertitle{
       font-weight: bold;
       color:#3f3f3f;
   }
   .modelimg{
    //    width: 120px;
    //    height:100px;
       img{
        display: block;
        width: 180px;
        height:150px;
        margin:0 auto;
       }
   }
   .introducemodel{
       height:20px;
       overflow: hidden;
       line-height: 20px;
   }
   a{
       &:hover{
           color:red;
           text-decoration: none;
       }
   }
</style>
