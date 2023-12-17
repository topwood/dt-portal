import request from "@/utils/axios";

export function login(data: any) {
	return request({
		url: "/login",
		method: "post",
		data,
	});
}

export function getInfo() {
	return request({
		url: "/user/info",
		method: "get",
		// params: {  }
	});
}

export function logout() {
	return request({
		url: "/logout",
		method: "post",
	});
}

export function sendMail(data: any) {
	return request({
		url: "/mail/resend",
		method: "post",
		data,
	});
}

// 绑定设备
export function bindDevice(data = {}) {
	return request({
		url: "/user/device/bind",
		method: "post",
		data,
	});
}

export function reset(data: any) {
	return request({
		url: "/account/reset",
		method: "post",
		data,
	});
}
