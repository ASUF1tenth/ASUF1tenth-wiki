This paper was used frequently in the following note.
[paper](https://persama.org.my/images/Menemui_Matematik/2025/MMv471_91_104.pdf)
## Cubic Splines for Curvature Minimization
To get a near optimal racing line (at least geometrically) we try to minimize the curvature of our path, that way the car can move as fast as possible without wasting energy in slowing down to take sharp turns.

![[CurveMiniIntro.png]]

First we split the racetrack into discretization points, which we should connect using cubic splines. These points can be obtained by constructing circles with the largest radii possible at every corner as follows:
![[Media/DiscretePointsPaper.png]]
Then to connect these points we assume that the x and y coordinates of the path between any two points can be represented in parametric form as cubic polynomials.
$$
y_i = a_i t^3 + b_i t^2 + c_i t + d_i\ , \; 0 \le t \le 1
$$
$$
x_i = e_i t^3 + f_i t^2 + g_i t + h_i\ , \; 0 \le t \le 1
$$
Afterwards we solve these equations while ensuring that the path is continuous and smooth by taking the boundary conditions
$$
x_i(1) = x_{i+1}(0), \;\; x'_i(1) = x'_{i+1}(0), \;\; x''_i(1) = x''_{i+1}(0)
$$
$$
y_i(1) = y_{i+1}(0), \;\; y'_i(1) = y'_{i+1}(0), \;\; y''_i(1) = y''_{i+1}(0)
$$
And the function to be minimized is the curvature of the path.
$$
\kappa = \frac{x' y'' - x'' y'} { ({x'}^2 + {y'}^2)^{3/2} }
$$
## Forward-Backward Solver for Velocity Profile
Given our minimum curvature path we must generate the required velocity at each point to follow that path. From our intuition we know that the car can't move too fast in a tight turn or it'll lose traction, so the maximum speed at any curve depends on the curvature $\kappa$ and traction (lateral acceleration $a_n$). **But** the velocity can't be very high at one point and then very low at the next one, so the velocity must also depend on the maximum acceleration and deceleration of the car.

![[Media/LevineHallPennLec.png]]

We start by generating a maximum velocity (taking curvature and traction only into account) at each point using the following relation. *****
$$
v_{max}=\sqrt{\frac{a_{lat,max}}{\kappa}}​
$$
​​This is called Maximum Velocity Curve (**MVC**)
### Forward Pass
in this pass, we move through the path and generate the feasible velocity at the next time-step.
$$
v_{i+1}​ = \sqrt{v_i^2​+2a_{engine}Δs_i}​​
$$
We compare that to the MVC, since $v_{i+1}$ is the maximum velocity at the next time-step limited only by our current velocity $v_i$ and maximum longitudinal acceleration $a_{engine}$. The MVC is the maximum velocity limited only by curvature $\kappa$ and traction $a_{lat,max}$.
To satisfy both restrictions we pick the minimum of the both.
### Backward Pass
in this pass, we move through the path backwards and generate the feasible velocity at the previous time-step.
$$
v_{i}​ = \sqrt{v_{i+1}^2​+2a_{brakes}Δs_i}​​
$$
Similarly, We compare that to the MVC and pick the minimum. Again, since $v_{i}$ is the maximum velocity at the *previous* time-step limited only by our current velocity $v_{i+1}$ and maximum longitudinal deceleration $a_{brakes}$. The MVC is the maximum velocity limited only by curvature $\kappa$ and traction $a_{lat,max}$.

**Then finally we compare the two passes and pick the minimum as well**
