---
# src/content/posts/infinite_well_and_harmonic_oscillator.md
title: 量子力学推导笔记：一维无限深势阱与谐振子
publishedAt: 2026-03-29T02:30:00+08:00 # 发布时间 (ISO 8601格式，含时区)
tags: ['math', 'physics']
description: 本文整理了量子力学中两个经典模型的薛定谔方程求解过程：一维无限深势阱的本征态求解，以及利用幂级数展开法求解量子谐振子。
---

本文整理了量子力学中两个经典模型的薛定谔方程求解过程：一维无限深势阱的本征态求解，以及利用幂级数展开法求解量子谐振子。

## 一、 一维无限深势阱

考虑一个宽度为 $2a$ 的一维无限深势阱，势能分布如下：
在势阱内部 ($|x| \le a$) 求解定态薛定谔方程：
$$-\frac{\hbar^2}{2m} \frac{d^2}{dx^2}\psi = E\psi$$

在势阱外部 ($|x| > a$)，波函数必须为零：
$$\psi = 0$$

### 1. 方程求解

将势阱内的方程改写为标准形式：

$$\psi'' + \frac{2mE}{\hbar^2}\psi = 0$$
令 $k^2 = \frac{2mE}{\hbar^2} > 0$，特征方程的根为 $r = \pm ik$。

因此，波函数的通解可以写为：

$$\psi(x) = A \cos kx + B \sin kx$$

### 2. 边界条件与能级

代入边界条件 $\psi(a) = \psi(-a) = 0$，得到方程组：

$$
\begin{cases}
A \cos ka = 0 \\
B \sin ka = 0
\end{cases} \implies ka = \frac{\pi}{2}n
$$

由此可以推导出体系的能量本征值（能级）：

$$E_n = \frac{n^2\pi^2\hbar^2}{2m(2a)^2} = \frac{n^2\pi^2\hbar^2}{8ma^2}$$

对应的波函数具有奇偶宇称性：

$$
\psi(x) = \begin{cases}
A \cos \frac{n\pi}{2a}x, & n \text{ 为奇数} \\
B \sin \frac{n\pi}{2a}x, & n \text{ 为偶数}
\end{cases}
$$

或者统一平移表达为：$\psi(x) = A' \sin \left[ \frac{n\pi}{2a}(x+a) \right]$。

---

## 二、 量子谐振子（级数解法）

一维谐振子的势能为 $V = \frac{1}{2}m\omega^2 x^2$，其薛定谔方程为：
$$-\frac{\hbar^2}{2m} \frac{d^2}{dx^2}\psi + \frac{1}{2}m\omega^2 x^2 \psi = E\psi$$

### 1. 无量纲化与渐进解

引入无量纲参数进行代换：
令 $\alpha = \sqrt{\frac{m\omega}{\hbar}}$，$A = \alpha x$，以及 $\lambda = \frac{2E}{\hbar\omega}$。
化简后的方程变为：
$$\frac{d^2}{dA^2}\psi + (\lambda - A^2)\psi = 0$$

考虑当 $x \to \infty$ 时的渐进解，此时 $\psi \propto e^{\pm \frac{A^2}{2}}$（舍去物理上发散的正号解）。
因此，我们假设波函数的形式为：
$$\psi = u(A) e^{-\frac{A^2}{2}}$$

代入原方程，得到关于 $u$ 的微分方程：
$$u'' - 2Au' + (\lambda - 1)u = 0$$

### 2. 幂级数求解

采用级数展开法求解该方程（注：以下推导中自变量符号暂时用 $x$ 替代 $A$ 进行书写）：
设 $u(x) = \sum_{v=0}^{\infty} a_v x^v$，求导得：
$$u'(x) = \sum_{v=1}^{\infty} v a_v x^{v-1}$$
$$u''(x) = \sum_{v=2}^{\infty} v(v-1) a_v x^{v-2} = \sum_{v=0}^{\infty} (v+2)(v+1) a_{v+2} x^v$$

将这些级数代入微分方程中，合并同类项：
$$\sum_{v=0}^{\infty} \left[ (v+2)(v+1)a_{v+2} x^v - 2v a_v x^v + (\lambda - 1) a_v x^v \right] = 0$$

为了使等式恒成立，各项系数必须为零。令 $k=v$ 并将系数 $a$ 记作 $b$，我们得到**递推关系式**：
$$(k+2)(k+1) b_{k+2} - 2k b_k + (\lambda - 1) b_k = 0$$
$$\implies b_{k+2} = \frac{2k - \lambda + 1}{(k+2)(k+1)} b_k$$

### 3. 宇称分析

通解 $u$ 可以分为奇函数和偶函数两部分：$u = u_{odd} + u_{even}$。

因为谐振子势能 $V = \frac{1}{2}m\omega^2 x^2$ 具有偶宇称对称性，所以波函数 $\psi$ 必须具有明确的宇称性。这意味着 $u_{odd}$ 和 $u_{even}$ 只能存在一个：
$$
\psi = \begin{cases}
u_{odd} e^{-\frac{A^2}{2}} \\
u_{even} e^{-\frac{A^2}{2}}
\end{cases}
$$

由于递推公式只关联相差 $2$ 的项（即 $b_k$ 与 $b_{k+2}$），常数项 $b_0$ 和 $b_1$ 可以独立指定（例如 $b_0 = b_1 = 1$），从而分别生成偶宇称和奇宇称的解，这就是厄米多项式（Hermite polynomials）的基础。
