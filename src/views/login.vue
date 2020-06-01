<style scoped lang="scss">
    @import "@/assets/styles/mixin.scss";
    @import "@/assets/styles/meteor.scss";
    .login {
        background: linear-gradient(to bottom, #0F63EA 0%, #1B72EE 10%, #2C9FFF 30%);
        height: 100vh;
        position: relative;
        overflow: hidden;
        /* 背景, 动画 */
        .login-bg {
            width: 100%;
            height: 100%;
            background-size: cover;
            background: url("../assets/image/login/bg.png") no-repeat fixed center bottom;
            position: absolute;
            z-index: 2;
            zoom: 1;
            .login-moon {
                width: 100px;
                height: 100px;
                background: url("../assets/image/login/y.png") no-repeat center;
                background-size: contain;
                position: absolute;
                top: 50px;
                left: 50px;
            }
            .login-mill {
                width: 220px;
                height: 420px;
                background: url("../assets/image/login/mf.png") no-repeat center;
                background-size: contain;
                position: relative;
                top: calc(50% - 210px);
                left: 15%;
                @keyframes retate {
                    from {
                        transform: rotateZ(0);
                    }
                    to {
                        transform: rotateZ(360deg);
                    }
                }
                .login-mill-y {
                    width: 320px;
                    height: 320px;
                    background: url("../assets/image/login/f.png") no-repeat center;
                    background-size: contain;
                    position: absolute;
                    top: -80px;
                    left: calc(50% - 173px);
                    animation: retate 24s linear 0 forwards;
                    animation-iteration-count: infinite;
                }
            }
        }
        /* 登录表单 */
        .login-form-wrap {
            width: 380px;
            height: 94vh;
            padding: 25px;
            background: #fff;
            border-radius: 10px;
            position: absolute;
            top: calc(50% - 47vh);
            right: 20px;
            z-index: 8;
            @include flex(center);
            .el-form {
                flex: 1;
                h2 {
                    width: 100%;
                    text-align: center;
                    margin-bottom: 35px;
                }
                .login-code-wrap {
                    /deep/.el-form-item__content {
                        @include flex(center, space-between);
                        .login-code {
                            flex: 1;
                            margin-left: 3%;
                            img {
                                width: 100%;
                                height: 100%;
                                cursor: pointer;
                            }
                        }
                    }
                }
                .el-input {
                    /deep/ .el-input__inner {
                        border-width: 0;
                        border-bottom-width: 1px;
                        border-radius: 0;
                    }
                }
                .login-btn {
                    width: 100%;
                    margin-top: 35px;
                }
            }
        }
        /* 版本 */
        .el-login-footer {
            width: 100%;
            height: 45px;
            line-height: 45px;
            color: #fff;
            font-size: 14px;
            text-align: center;
            position: absolute;
            left: 0;
            bottom: 0;
            z-index: 8;
        }
    }
</style>

<template>
    <div class="login">
        <!-- 流星 -->
        <div class="meteor-wrap">
            <div v-for="index in meteorNum" :key="index" class="meteor-item"></div>
        </div>
        <!-- 背景 -->
        <div class="login-bg">
            <div class="login-moon"></div>
            <div class="login-mill">
                <div class="login-mill-y"></div>
            </div>
        </div>
        <!-- 表单 -->
        <div class="login-form-wrap">
            <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
                <h2 class="title">欢迎登录</h2>
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="账号">
                        <el-icon slot="prefix" name="user" />
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        v-model="loginForm.password"
                        type="password"
                        auto-complete="off"
                        placeholder="密码">
                        <el-icon slot="prefix" name="lock" />
                    </el-input>
                </el-form-item>
                <el-form-item prop="code" class="login-code-wrap">
                    <el-input
                        v-model="loginForm.code"
                        auto-complete="off"
                        placeholder="验证码"
                        style="width: 60%">
                        <el-icon slot="prefix" name="key" />
                    </el-input>
                    <div class="login-code">
                        <img :src="codeUrl" @click="getCode" />
                    </div>
                </el-form-item>
                <el-form-item style="width:100%;">
                    <el-button
                        :loading="loading"
                        size="medium"
                        class="login-btn"
                        round
                        type="primary"
                        @click.native.prevent="handleLogin">
                        <span v-if="!loading">登 录</span>
                        <span v-else>登 录 中...</span>
                    </el-button>
                </el-form-item>
            </el-form>
        </div>

        <!--  底部  -->
        <div class="el-login-footer">
            <span>Copyright © 2020 Version 0.1.0</span>
        </div>
    </div>
</template>

<script>
    import { meteorNum } from '@/assets/styles/meteor.scss';
    import { getCode, login } from "@/api/login";

    export default {
		name: "login",
        data(){
			return {
				codeUrl: '',
				loading: false,
				meteorNum: Number(meteorNum),
				loginForm: {
					username: 'admin',
                    password: 'admin123456',
                    code: ''
                },
				loginRules: {
					username: [{ required: true, trigger: "blur", message: "用户名不能为空" }],
                    password: [{ required: true, trigger: "blur", message: "密码不能为空" }],
                    code: [{ required: true, trigger: "blur", message: "验证码不能为空" }]
                }
            }
        },
        created() {
		    this.getCode();
        },
        methods: {
			/* 更换验证码 */
			getCode(){
			    getCode().then(res => {
                    if(res.status === 200){
                        this.codeUrl = res.data;
                    }
                })
            },
            /* 登录 */
			handleLogin(){
                this.$store.dispatch('global/login', this.loginForm).then(status => {
                    if(status === 200){
                        this.$router.push({ path: this.$route.query.redirect || '/' })
                    } else if(status === 201){
                        this.getCode();
                    }
                })
            }
        }
	}
</script>

