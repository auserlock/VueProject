<script setup>
import { useBusinessTypeStore } from '@/stores'
const useTypeStore = useBusinessTypeStore()
import { useBusinessStore } from '@/stores'
const businessStore = useBusinessStore()
</script>

<template>
  <div class="home-category">
    <ul class="menu">
      <li v-for="(item, index) in useTypeStore.BusinessTypeInfo" :key="item">
        <RouterLink :to="`/order/list/100${index}`">{{ item }}</RouterLink>
        <!-- 弹层layer位置 -->
        <div class="layer">
          <h4>分类推荐 <small>根据您的消费或浏览记录推荐</small></h4>
          <ul>
            <li
              v-for="i in businessStore.BusinessInfo[index + 1]
                ? businessStore.BusinessInfo[index + 1].slice(0, 6)
                : []"
              :key="i.businessId"
            >
              <RouterLink :to="`/order/list/100${index}/${i.businessId}`">
                <img :src="i.businessImg" alt="" />
                <div class="info">
                  <p class="name ellipsis-2">{{ i.businessName }}</p>
                  <p class="desc ellipsis">{{ i.businessExplain }}</p>
                </div>
              </RouterLink>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.home-category {
  width: 250px;
  height: 600px;
  background: rgba(0, 0, 0, 0.8);
  position: relative;
  left: 10%;
  z-index: 99;

  .menu {
    li {
      padding-left: 40px;
      height: 60px;
      line-height: 55px;
      list-style: none;

      &:hover {
        background: green;
      }

      a {
        margin-right: 4px;
        color: #fff;

        &:first-child {
          font-size: 16px;
        }
      }

      .layer {
        width: 990px;
        height: 600px;
        background: rgba(255, 255, 255, 0.8);
        position: absolute;
        left: 250px;
        top: 0;
        display: none;
        padding: 0 15px;

        h4 {
          font-size: 20px;
          font-weight: normal;
          line-height: 80px;
          position: relative;
          top: -3%;

          small {
            font-size: 16px;
            color: #666;
          }
        }

        ul {
          display: flex;
          flex-wrap: wrap;
          list-style: none;

          li {
            width: 310px;
            height: 120px;
            margin-right: 15px;
            margin-bottom: 15px;
            border: 1px solid #eee;
            border-radius: 4px;
            background: #fff;

            // &:nth-child(3n) {
            //   margin-right: 0;
            // }

            a {
              display: flex;
              width: 100%;
              height: 100%;
              align-items: center;
              padding: 10px;

              &:hover {
                background: #e3f9f4;
                height: 85%;
                width: 94%;
              }

              img {
                width: 95px;
                height: 95px;
                position: relative; /* 绝对定位 */
                left: -25px;
                top: -8%;
              }

              .info {
                padding-left: 10px;
                line-height: 24px;
                overflow: hidden;

                .name {
                  font-size: 16px;
                  color: #666;
                }

                .desc {
                  color: #999;
                }
              }
            }
          }
        }
      }

      // 关键样式  hover状态下的layer盒子变成block
      &:hover {
        .layer {
          display: block;
        }
      }
    }
  }
}
</style>
