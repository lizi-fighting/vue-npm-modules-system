<template>
  <div class="app-container">
    <el-row
      type="flex"
    >
      <el-button
        type="primary"
        plain
        icon="el-icon-plus"
        @click.native.prevent="handleCreate"
      >
        新增
      </el-button>
    </el-row>

    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      :style="{'width': '100%', 'margin-top': '15px'}"
    >
      <el-table-column
        label="序号"
        type="index"
        align="center"
        width="50"
      />
      <el-table-column
        width="80"
        align="center"
        label="ID"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="用户名"
      >
        <template slot-scope="{row}">
          <span>{{ row.userName }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        width="120px"
        label="姓名"
      >
        <template slot-scope="{row}">
          <span>{{ row.contact }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        width="160px"
        label="联系电话"
      >
        <template slot-scope="{row}">
          <span>{{ row.contactPhone }}</span>
        </template>
      </el-table-column>
      <!--<el-table-column
        width="180px"
        align="center"
        label="电子邮件"
      >
        <template slot-scope="{row}">
          <span>{{ row.email }}</span>
        </template>
      </el-table-column>-->

      <el-table-column
        width="180px"
        align="center"
        label="有效期"
      >
        <template slot-scope="{row}">
          <span>{{ row.validityDate }}</span>
        </template>
      </el-table-column>

      <!--<el-table-column
        width="100px"
        align="center"
        label="创建人"
      >
        <template slot-scope="{row}">
          <span>{{ row.createUserName }}</span>
        </template>
      </el-table-column>-->
      <el-table-column
        width="180px"
        align="center"
        label="创建时间"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <!--<el-table-column
        width="100px"
        align="center"
        label="修改人"
      >
        <template slot-scope="{row}">
          <span>{{ row.updateUserName }}</span>
        </template>
      </el-table-column>-->
      <el-table-column
        width="180px"
        align="center"
        label="更新时间"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.updateTime }}</span>
        </template>
      </el-table-column>

      <el-table-column
        class-name="status-col"
        label="状态"
      >
        <template slot-scope="{row}">
          <el-switch
            v-model="row.enabled"
            active-text="正常"
            inactive-text="禁用"
            @change="enabledChange(row.id, row.enabled)"
          />
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="操作"
        width="160px"
      >
        <template slot-scope="scope">
          <el-button
            plain
            type="info"
            size="mini"
            @click="handleEdit(scope.row.id)"
          >
            修改
          </el-button>
          <el-button
            type="danger"
            size="mini"
            @click="handleDelete(scope.row.id)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.current"
      :limit.sync="listQuery.size"
      @pagination="getList()"
    />

    <el-dialog
      :title="dialogStatus === 'create' ? '新增用户信息' : '修改用户信息'"
      :visible.sync="saveUserShow"
      width="800px"
    >
      <!--<user-view-->
        <!--:id="id"-->
        <!--:show-dialog="saveUserShow"-->
        <!--@closeDialog="closeDialog"-->
        <!--@loadData="getList"-->
      <!--/>-->
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { getUsers, delUser, changeEnabled } from '../../api/users'
import Pagination from '@/components/Pagination/index.vue'
// import UserView from '@/views/system/user/userInfo.vue'

@Component({
  name: 'User',
  components: {
    Pagination
    // UserView
  }
})
export default class User extends Vue {
  private id = 0
  private total = 0
  private list = []
  private listLoading = true
  private listQuery = {
    current: 1,
    size: 20
  }
  private saveUserShow = false

  private dialogStatus = 'create'

  created () {
    this.getList()
  }

  private async getList () {
    this.listLoading = true
    const { data } = await getUsers(this.listQuery)
    this.list = data.records
    this.total = data.total
    // Just to simulate the time of the request
    setTimeout(() => {
      this.listLoading = false
    }, 0.5 * 1000)
  }

  private enabledChange (_id: string, value: boolean) {
    // changeEnabled(_id, value).then((res: any) => {
    //   this.$message({
    //     type: res.success ? 'success' : 'error',
    //     message: res.msg
    //   })
    // })
  }

  private handleCreate () {
    this.id = 0
    this.saveUserShow = true
    this.dialogStatus = 'create'
  }

  private handleEdit (_id: number) {
    this.id = _id
    this.dialogStatus = 'update'
    this.saveUserShow = true
  }

  private handleDelete (id: string) {
    this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      // delUser(id).then((res: any) => {
      //   if (res.code === 200) {
      //     this.$message({
      //       type: 'success',
      //       message: res.msg
      //     })
      //     this.getList()
      //   } else {
      //     this.$message({
      //       type: 'error',
      //       message: res.msg
      //     })
      //   }
      // })
    })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
  }

  private closeDialog () {
    this.saveUserShow = false
  }
}
</script>

<style lang="less">
  .slide-in-enter-active, .slide-in-leave-active{
    transition: all .25s linear;
    transform: translate3D(0, 0, 0);
  }
  .slide-in-enter,.slide-in-leave-to{
    transform: translate3D(100%, 0, 0);
  }
</style>

<style lang="less" scoped>
  .edit-input {
    padding-right: 100px;
  }

  .cancel-btn {
    position: absolute;
    right: 15px;
    top: 10px;
  }
</style>
