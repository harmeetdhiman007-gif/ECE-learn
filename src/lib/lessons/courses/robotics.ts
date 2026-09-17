import type { GeneratedGroup, ModuleSpec } from './presets.js';
import { build } from './presets.js';

const MODULES: ModuleSpec[] = [
  // ── Foundations
  {
    key: 'rb-fnd-01',
    unit: 'Robotics Foundations',
    title: 'What Makes a Robot',
    level: 'basic',
    body:
      'A robot senses, thinks, and acts: sensors bring data in, a controller decides (compute), and actuators act on the world. The robot loop — sense, plan, act — runs faster than the world changes.',
    qs: [
      {
        p: 'The three robot pillars are:',
        c: ['Sensing, computation, actuation', 'Motor, wire, battery', 'Camera, wheel, arm', 'Speed, weight, cost'],
        a: 0,
        e: 'Perceive → decide → move is the robot loop.',
      },
    ],
  },
  {
    key: 'rb-fnd-02',
    unit: 'Robotics Foundations',
    title: 'Degrees of Freedom',
    level: 'basic',
    body:
      'Degrees of freedom (DOF) are independent motions possible. A mobile robot: 3 DOF (x, y, heading). A 6-DOF arm: three positions plus three orientations. More DOF = more dexterity and much harder control.',
    qs: [
      {
        p: 'A wheeled robot on a flat floor has:',
        c: ['3 DOF', '6 DOF', '1 DOF', 'Infinite DOF'],
        a: 0,
        e: 'x, y, and heading θ.',
      },
    ],
  },
  {
    key: 'rb-fnd-03',
    unit: 'Robotics Foundations',
    title: 'Open-Loop vs Closed-Loop',
    level: 'basic',
    body:
      'Open loop commands an output with no measurement: if the robot drifts, nothing corrects it. Closed loop measures the result and feeds it back. Feedback is what makes robots robust to the real world.',
    qs: [
      {
        p: 'In closed-loop control, you:',
        c: ['Measure an output and adjust', 'Send a fixed command', 'Only use timers', 'Disable the motor'],
        a: 0,
        e: 'Measure → compare → correct.',
      },
    ],
  },
  {
    key: 'rb-fnd-04',
    unit: 'Robotics Foundations',
    title: 'The Control Loop Rate',
    level: 'intermediate',
    body:
      'The loop rate (e.g., 100 kHz for motor current, 1 kHz for balance, 10-50 Hz for path planning) must be faster than the physics you control. Sensor latency and loop lag decide stability — run as fast as the sensors allow.',
    qs: [
      {
        p: 'Slow loop rates relative to dynamics cause:',
        c: ['Instability and lag', 'Perfect tracking', 'Longer range', 'Quieter motors'],
        a: 0,
        e: 'Stale corrections cannot control fast systems.',
      },
    ],
  },
  {
    key: 'rb-fnd-05',
    unit: 'Robotics Foundations',
    title: 'Coordinate Frames',
    level: 'intermediate',
    body:
      'Positions live in frames: robot frame (from its center), world frame (from a reference), camera frame. Transformations (rotation + translation) map one to another. Mixing frames is a classic source of "the robot is looking the wrong way".',
    qs: [
      {
        p: 'A transformation maps points between:',
        c: ['Coordinate frames', 'Batteries', 'Motor torques', 'Pin numbers'],
        a: 0,
        e: 'Rigid transforms relate one frame to another.',
      },
    ],
  },

  // ── Kinematics & Motion
  {
    key: 'rb-kin-01',
    unit: 'Kinematics & Motion',
    title: 'Position, Velocity, Acceleration',
    level: 'basic',
    body:
      'Dynamics ladder: position → integrate velocity → integrate acceleration. Flipped, encoders measure position; differentiating gives velocity (noisy). Accelerometers measure acceleration; integrating drifts (gravity bias).',
    qs: [
      {
        p: 'Velocity is the time derivative of:',
        c: ['Position', 'Acceleration', 'Jerk', 'Force'],
        a: 0,
        e: 'v = d(position)/dt.',
      },
    ],
  },
  {
    key: 'rb-kin-02',
    unit: 'Kinematics & Motion',
    title: 'Wheel Odometry',
    level: 'intermediate',
    body:
      'Count encoder ticks and multiply by distance-per-tick: left and right wheels measure a distance. From the two distances and wheelbase you approximate position and heading. It is cheap, but wheels slip — odometry drifts.',
    qs: [
      {
        p: 'Differential odometry estimates heading from:',
        c: ['The difference of the two wheel distances', 'GPS only', 'Motor current', 'Battery voltage'],
        a: 0,
        e: 'left − right motion rotates the robot.',
      },
    ],
  },
  {
    key: 'rb-kin-03',
    unit: 'Kinematics & Motion',
    title: 'Forward and Inverse Kinematics',
    level: 'intermediate',
    body:
      'Forward kinematics: given joint angles, where is the arm\u2019s hand? Inverse kinematics: to put the hand at (x, y, z), what angles? Simple arms solve IK by geometry; complex ones use numeric or analytic solvers.',
    qs: [
      {
        p: 'Inverse kinematics solves for:',
        c: ['Joint angles from a desired pose', 'Pose from joint angles', 'Motor currents', 'Battery life'],
        a: 0,
        e: 'IK is pose → joint angles.',
      },
    ],
  },
  {
    key: 'rb-kin-04',
    unit: 'Kinematics & Motion',
    title: 'Velocity Control Profile',
    level: 'intermediate',
    body:
      'A trapezoidal velocity profile accelerates, cruises, decelerates to stop precisely. Without it, motors jerk, overshoot, and wear. Profile generation is basic motion planning: start fast, brake earlier than you think.',
    qs: [
      {
        p: 'A trapezoidal profile reduces:',
        c: ['Jerk and overshoot at stops', 'Battery size', 'Motor torque', 'Encoder counts'],
        a: 0,
        e: 'Gradual acceleration/deceleration smooths stops.',
      },
    ],
  },
  {
    key: 'rb-kin-05',
    unit: 'Kinematics & Motion',
    title: 'Dead Reckoning Limits',
    level: 'advanced',
    body:
      'Dead reckoning integrates small errors until it is wildly wrong — wheel slip, uneven ground, and encoder bias accumulate. No robot trusts odometry alone for long; sensors and maps correct the drift.',
    qs: [
      {
        p: 'Dead reckoning fails over time due to:',
        c: ['Accumulated error', 'Random luck', 'Faster CPUs', 'Magnetic poles'],
        a: 0,
        e: 'Errors add up without external reference.',
      },
    ],
  },

  // ── Motors & Actuators
  {
    key: 'rb-mot-01',
    unit: 'Actuators & Motors',
    title: 'DC Motor Basics',
    level: 'basic',
    body:
      'A brushed DC motor spins when current flows through a commutated armature in a magnetic field. Speed ∝ voltage, torque ∝ current. Cheap and simple; the brushes wear and spark.',
    qs: [
      {
        p: 'DC motor speed is proportional to:',
        c: ['Applied voltage', 'Load resistance', 'Temperature', 'Shaft length'],
        a: 0,
        e: 'Speed ≈ voltage in the linear region.',
      },
    ],
  },
  {
    key: 'rb-mot-02',
    unit: 'Actuators & Motors',
    title: 'H-Bridge Control',
    level: 'intermediate',
    body:
      'An H-bridge of four switches feeds power across the motor either way: forward, reverse, brake (both low), coast (all off). Drive it with PWM to control speed. Never enable both sides of a leg — that is a short.',
    qs: [
      {
        p: 'Reversing a DC motor needs:',
        c: ['An H-bridge to flip current direction', 'Just more voltage', 'Fewer batteries', 'A diode'],
        a: 0,
        e: 'Crossed switch set reverses the polarity at the motor.',
      },
    ],
  },
  {
    key: 'rb-mot-03',
    unit: 'Actuators & Motors',
    title: 'Gearboxes and Torque',
    level: 'basic',
    body:
      'A gearbox trades speed for torque: a 30:1 gear ratio multiplies torque ~30× and divides speed by 30. Gearboxes let a tiny motor lift real weight. Gear backlash is the price you pay in control precision.',
    qs: [
      {
        p: 'A 10:1 gearbox:',
        c: ['Multipiies torque, divides speed', 'Doubles speed', 'Adds voltage', 'Is a stepper'],
        a: 0,
        e: 'Mechanical advantage comes from the ratio.',
      },
    ],
  },
  {
    key: 'rb-mot-04',
    unit: 'Actuators & Motors',
    title: 'Encoders',
    level: 'intermediate',
    body:
      'Quadrature encoders output two phase-shifted channels A and B: the order tells direction, the count gives position, and decoding 4× (counting both edges) quadruples resolution. Count on a timer channel, not in a slow loop.',
    qs: [
      {
        p: 'Quadrature phase order reveals:',
        c: ['Direction', 'Only speed magnitude', 'Temperature', 'Battery state'],
        a: 0,
        e: 'A leads B vs B leads A → direction.',
      },
    ],
  },
  {
    key: 'rb-mot-05',
    unit: 'Actuators & Motors',
    title: 'Servo Motors',
    level: 'basic',
    body:
      'Positional servos hold an angle from a PWM pulse width (≈1 ms = 0°, 1.5 ms = 90°, 2 ms = 180°) using internal feedback. Continuous-rotation servos are just geared DC motors with an ESC-like standard. Servos are the easiest way to get joints.',
    qs: [
      {
        p: 'A 1.5 ms servo pulse usually commands:',
        c: ['Center (~90°)', 'Full left', 'Full right', 'No movement ever'],
        a: 0,
        e: 'Midpoint pulse = centered angle.',
      },
    ],
  },
  {
    key: 'rb-mot-06',
    unit: 'Actuators & Motors',
    title: 'Stepper Motors',
    level: 'intermediate',
    body:
      'Steppers step in fixed increments by energizing coils in sequence: 200 steps/rev = 1.8°/step. They hold position with full torque at standstill but slip if overloaded. Great for open-loop precision (printers, telescopes).',
    qs: [
      {
        p: 'A 1.8°/step motor has roughly:',
        c: ['200 steps per revolution', '100 steps', '360 steps', '18 steps'],
        a: 0,
        e: '360 / 1.8 = 200.',
      },
    ],
  },
  {
    key: 'rb-mot-07',
    unit: 'Actuators & Motors',
    title: 'BLDC and FOC',
    level: 'advanced',
    body:
      'Brushless motors (quadcopters, EV) are commutated electronically. Field-oriented control (FOC) keeps the stator field aligned with the rotor via current sensing and transforms — maximum torque with smooth, efficient spin. Complexity but worth it.',
    qs: [
      {
        p: 'BLDC motors are commutated:',
        c: ['Electronically, no brushes', 'By carbon brushes', 'By the user', 'Overheating'],
        a: 0,
        e: 'Sensor-based commutation replaces brushes.',
      },
    ],
  },
  {
    key: 'rb-mot-08',
    unit: 'Actuators & Motors',
    title: 'Solenoids and Linear Actuators',
    level: 'intermediate',
    body:
      'A solenoid is a coil pulling a plunger: on/off bang actuation best at high voltage, momentary duty. Linear actuators convert motor rotation to push/pull with a screw or rack. Choose force × speed × stroke carefully.',
    qs: [
      {
        p: 'A solenoid provides:',
        c: ['Bang-force on/off actuation', 'Continuous rotation', 'Precise angle control', 'Wireless power'],
        a: 0,
        e: 'Electromagnetic plunge toggles states.',
      },
    ],
  },
  {
    key: 'rb-mot-09',
    unit: 'Actuators & Motors',
    title: 'Motor Driver ICs',
    level: 'intermediate',
    body:
      'Drivers (like the classic TB6612/DRV8871) take logic PWM/torque signals and switch the heavy current to the motor safely with built-in protection. Always check maximum current and shoot-through protection.',
    qs: [
      {
        p: 'A motor driver sits between:',
        c: ['The MCU and the motor\'s current', 'The battery and the MCU only', 'Two wheels only', 'Nothing'],
        a: 0,
        e: 'It amplifies logic-level control into power.',
      },
    ],
  },

  // ── Sensors
  {
    key: 'rb-sens-01',
    unit: 'Sensors & Perception',
    title: 'Ultrasonic Rangefinders',
    level: 'basic',
    body:
      'An ultrasonic sensor pings a burst and times the echo: distance = speed of sound × time / 2. Cheap and great for inches-to-meters, but soft surfaces swallow echoes and 40 kHz bursts travel at a fixed speed that varies with air temperature.',
    qs: [
      {
        p: 'Ultrasonic distance is computed from:',
        c: ['Echo time-of-flight', 'Signal strength only', 'Frequency', 'Pulse width of power'],
        a: 0,
        e: 'Round-trip time times speed ∕ 2.',
      },
    ],
  },
  {
    key: 'rb-sens-02',
    unit: 'Sensors & Perception',
    title: 'Infrared Proximity',
    level: 'basic',
    body:
      'IR distance sensors shine IR and measure reflectance (short range, surface-dependent) or use geometry (sharp/GI sensors give a voltage curve versus distance). IR is cheap and fast but blind in bright sunlight.',
    qs: [
      {
        p: 'Reflective IR sensors measure:',
        c: ['Returned IR intensity', 'Absolute distance by radio', 'Temperature', 'Humidity'],
        a: 0,
        e: 'More bounce = closer (surface dependent).',
      },
    ],
  },
  {
    key: 'rb-sens-03',
    unit: 'Sensors & Perception',
    title: 'IMU: Accelerometer + Gyro',
    level: 'intermediate',
    body:
      'An IMU packs an accelerometer (linear acceleration) and gyroscope (angular rate). Accelerometers see gravity (huge bias), gyros drift (integration error). Fusing both — a complementary or Kalman filter — gives attitude.',
    qs: [
      {
        p: 'Gyro readings need fusion because:',
        c: ['Their integration drifts', 'They overflow quickly', 'They are digital', 'They hate magnets'],
        a: 0,
        e: 'Integrate rate → drift accumulates; accelerometer corrects it.',
      },
    ],
  },
  {
    key: 'rb-sens-04',
    unit: 'Sensors & Perception',
    title: 'Magnetometers and Compasses',
    level: 'intermediate',
    body:
      'A 3-axis magnetometer senses the local magnetic field — the earth\u2019s field dominates, giving heading. But motors and steel distort it; hard-iron (fixed offsets) and soft-iron (scaling) calibration is mandatory before heading is usable.',
    qs: [
      {
        p: 'A compass heading says:',
        c: ['Direction relative to magnetic north', 'Height', 'Speed', 'Motor angle'],
        a: 0,
        e: 'Bearing from the field vector.',
      },
    ],
  },
  {
    key: 'rb-sens-05',
    unit: 'Sensors & Perception',
    title: 'GPS Basics',
    level: 'intermediate',
    body:
      'GPS triangulation uses time of flight from ≥4 satellites. Accuracy is meters (code) to centimeters (RTK/carrier). Urban canyons and indoors kill it. GPS is a global absolute frame, but slow and fragile — fuse it with odometry.',
    qs: [
      {
        p: 'GPS needs a minimum of how many satellites?',
        c: ['4', '1', '2', '10'],
        a: 0,
        e: 'Three for position, one more for clock error.',
      },
    ],
  },
  {
    key: 'rb-sens-06',
    unit: 'Sensors & Perception',
    title: 'Line Following Sensors',
    level: 'basic',
    body:
      'Line-follow arrays are IR reflectives reading dark versus light: a dark band reflects little, white reflects plenty. Thresholding each sensor gives the binary line pattern — the input to a follow controller.',
    qs: [
      {
        p: 'Line-follow sensors use:',
        c: ['IR reflectance vs threshold', 'Ultrasound', 'Color photo pixels', 'Weight'],
        a: 0,
        e: 'Reflectance differs on line vs floor.',
      },
    ],
  },
  {
    key: 'rb-sens-07',
    unit: 'Sensors & Perception',
    title: 'Cameras: Raw Pixels',
    level: 'advanced',
    body:
      'A camera is a 2D array of intensity/color samples. Raw frames are huge (640×480×3 ≈ 920 KB) and full of noise; robots almost never process raw pixels — they detect features, edges, and regions first, then reason on those.',
    qs: [
      {
        p: 'Robots usually process images after:',
        c: ['Feature/detection reduction', 'Storing every pixel forever', 'Printing them', 'Compressing to ASCII'],
        a: 0,
        e: 'Reduce raw pixels to features first.',
      },
    ],
  },
  {
    key: 'rb-sens-08',
    unit: 'Sensors & Perception',
    title: 'LIDAR and Depth Sensors',
    level: 'advanced',
    body:
      'LIDAR scans a laser and measures time-of-flight, producing a point cloud or 2D occupancy map. Depth cameras (structrued light, ToF, stereo) give 3D. Both give robots "eyes with numbers" for SLAM and obstacle avoidance.',
    qs: [
      {
        p: 'LIDAR measures distance via:',
        c: ['Laser time-of-flight', 'Radio echo', 'Visual brightness', 'Audio phase'],
        a: 0,
        e: 'Travel time of a laser pulse.',
      },
    ],
  },
  {
    key: 'rb-sens-09',
    unit: 'Sensors & Perception',
    title: 'Fusing Sensors',
    level: 'advanced',
    body:
      'No single sensor is trustworthy: GPS drifts slowly, odometry slips now, IMU drifts in minutes. A Kalman filter merges predictions and noisy measurements by uncertainty, giving a better estimate than any sensor alone.',
    qs: [
      {
        p: 'A Kalman filter combines:',
        c: ['A prediction model and noisy measurements', 'Only measurements', 'Only guesses', 'Two motors'],
        a: 0,
        e: 'Model + measurements weighted by covariance.',
      },
    ],
  },

  // ── Control
  {
    key: 'rb-ctl-01',
    unit: 'Control Systems',
    title: 'The P in PID',
    level: 'basic',
    body:
      'P (proportional) control: correction = Kp × error. If error is big, push hard; if small, back off. P alone always leaves a steady-state error with real loads: too weak follows slowly, too strong oscillates.',
    qs: [
      {
        p: 'P-control output is proportional to:',
        c: ['The error', 'The error\'s derivative', 'The integral', 'The setpoint alone'],
        a: 0,
        e: 'Kp × (target − measured).',
      },
    ],
  },
  {
    key: 'rb-ctl-02',
    unit: 'Control Systems',
    title: 'The I in PID',
    level: 'intermediate',
    body:
      'I (integral) accumulates error over time and adds a correction, eliminating steady-state offset (like friction drag). Too much I causes overshoot and windup when the actuator saturates — clamp the integrator.',
    qs: [
      {
        p: 'Integral action mainly removes:',
        c: ['Steady-state error', 'Noise entirely', 'Overshoot', 'Battery drain'],
        a: 0,
        e: 'It builds up a correction for constant load.',
      },
    ],
  },
  {
    key: 'rb-ctl-03',
    unit: 'Control Systems',
    title: 'The D in PID',
    level: 'intermediate',
    body:
      'D (derivative) reacts to how fast error is changing — damping that slows approach and counters overshoot. It amplifies sensor noise; filter before differentiating, or the derivative term rattles the loop.',
    qs: [
      {
        p: 'Derivative action dampens motion by responding to:',
        c: ['Error rate-of-change', 'Total error history', 'Setpoint only', 'Battery state'],
        a: 0,
        e: 'High error slope → strong opposing action.',
      },
    ],
  },
  {
    key: 'rb-ctl-04',
    unit: 'Control Systems',
    title: 'Tuning a PID',
    level: 'advanced',
    body:
      'Quick tune: start Kp small, raise until a mild oscillation, then add Ki to kill offset and a little Kd for damping. Systematic methods (Ziegler-Nichols, step response) give starting points. Tune in the real environment, not just on the bench.',
    qs: [
      {
        p: 'Raising Kp too far usually causes:',
        c: ['Oscillation', 'Zero error forever', 'No effect', 'Battery gain'],
        a: 0,
        e: 'Stiff loops resonate.',
      },
    ],
  },
  {
    key: 'rb-ctl-05',
    unit: 'Control Systems',
    title: 'Bang-Bang and On-Off Control',
    level: 'basic',
    body:
      'Simplest controller: full on when below setpoint, off above — a thermostat. It is easy but oscillates around the setpoint (hysteresis fixes that: turn on at T+1, off at T−1). For fans and heaters, bang-bang is fine.',
    qs: [
      {
        p: 'Hysteresis prevents:',
        c: ['Rapid on/off chatter', 'Motors stalling', 'All noise', 'Battery loss'],
        a: 0,
        e: 'Two thresholds prevent chattering at one.',
      },
    ],
  },
  {
    key: 'rb-ctl-06',
    unit: 'Control Systems',
    title: 'Feedforward',
    level: 'advanced',
    body:
      'Feedforward applies a command based on the model before the error exists (gravity compensation on an arm: lift output based on angle). Feedback cleans up the residue. Feedforward makes controllers fast; feedback makes them right.',
    qs: [
      {
        p: 'Feedforward improves response by:',
        c: ['Precomputing expected effort', 'Waiting for errors', 'Slowing the loop', 'Doubling the gain'],
        a: 0,
        e: 'Model-informed open-loop effort + feedback trim.',
      },
    ],
  },
  {
    key: 'rb-ctl-07',
    unit: 'Control Systems',
    title: 'Obstacle Avoidance Logic',
    level: 'basic',
    body:
      'Avoidance runs on simple rules: if front too close, turn toward the clearer side; if boxed in, back up and rotate. State machines over sensors beat naive "turn left always". Combine with goal-seeking for wander-with-purpose.',
    qs: [
      {
        p: 'A simple avoidance policy when blocked is:',
        c: ['Turn toward the clearer direction', 'Stop forever', 'Increase speed', 'Ignore the wall'],
        a: 0,
        e: 'Choose the viable heading first.',
      },
    ],
  },
  {
    key: 'rb-ctl-08',
    unit: 'Control Systems',
    title: 'PID Sample Time',
    level: 'advanced',
    body:
      'PID runs at fixed intervals, not as fast as possible: dt must be constant or the gains change meaning. Set a timer interrupt at the control rate and hide careful code there, keeping the main loop for logistics.',
    qs: [
      {
        p: 'A fixed control sample time matters because:',
        c: ['Gain values assume a fixed dt', 'It saves energy', 'Motors prefer it', 'It hides bugs'],
        a: 0,
        e: 'Derivative/integral scaling depends on dt.',
      },
    ],
  },

  // ── Robot Architecture
  {
    key: 'rb-arc-01',
    unit: 'Robot Architectures',
    title: 'Behavior-Based Control',
    level: 'intermediate',
    body:
      'Layered behaviors (avoid obstacles, wander, seek goal) compete with priorities: the higher-priority behavior overrides. Subsumption architecture wires them as prioritized winners, giving reactive survival without heavy planning.',
    qs: [
      {
        p: 'Behavior arbitration picks:',
        c: ['The highest-priority active behavior', 'The fastest one', 'A random one', 'The newest'],
        a: 0,
        e: 'Priority decides which behavior drives the motors.',
      },
    ],
  },
  {
    key: 'rb-arc-02',
    unit: 'Robot Architectures',
    title: 'The Reactive Sense-Act Loop',
    level: 'basic',
    body:
      'Reactive robots map sensor input straight to action: wall too close → steer away. It is fast, robust, and simple, but purely reactive agents get trapped and have no memory of where they have been.',
    qs: [
      {
        p: 'A purely reactive robot:',
        c: ['Has no internal model or memory of place', 'Builds a world map', 'Plans long routes', 'Uses GPS maps'],
        a: 0,
        e: 'Reflex decision from the current sense only.',
      },
    ],
  },
  {
    key: 'rb-arc-03',
    unit: 'Robot Architectures',
    title: 'Deliberative / Plan-Based',
    level: 'advanced',
    body:
      'Deliberative robots build a model (map), plan a route, then execute. Sense → World model → Plan → Act. Powerful in known environments; slow when the world changes faster than replanning.',
    qs: [
      {
        p: 'Plan-based robots depend on:',
        c: ['A model of the world to reason over', 'Instant reflexes only', 'Random walking', 'Human teleop'],
        a: 0,
        e: 'Reasoning needs a representation to plan on.',
      },
    ],
  },
  {
    key: 'rb-arc-04',
    unit: 'Robot Architectures',
    title: 'Hybrid Architecture',
    level: 'intermediate',
    body:
      'Real robots mix layers: a planner picks goals and paths, a behavioral layer reacts to nearby obstacles, and a servo layer smooths motion. Top-down goals, bottom-up reflexes — with well-defined interfaces between layers.',
    qs: [
      {
        p: 'A hybrid architecture combines:',
        c: ['Planning with reactive reflexes', 'Only sensors', 'Only motors', 'Pure math'],
        a: 0,
        e: 'Plan + react + actuate in layers.',
      },
    ],
  },
  {
    key: 'rb-arc-05',
    unit: 'Robot Architectures',
    title: 'ROS in a Nutshell',
    level: 'intermediate',
    body:
      'ROS is middleware for robot software: nodes publish/subscribe topics and call services, giving reusable building blocks (nav, perception, message types). It is a communication and tooling ecosystem, not the robot itself.',
    qs: [
      {
        p: 'ROS nodes communicate via:',
        c: ['Publisher/subscriber topics', 'Shared pointers everywhere', 'Global variables', 'Files only'],
        a: 0,
        e: 'Async pub/sub decouples nodes.',
      },
    ],
  },

  // ── Locomotion
  {
    key: 'rb-loc-01',
    unit: 'Locomotion',
    title: 'Differential Drive',
    level: 'intermediate',
    body:
      'Two driven wheels + casters. Moving both forward = forward; one forward one back = spin in place. Control is simply speeds (v, ω) mapped to (left, right) wheel speeds. Zero-turn radius but unstable on accelerations.',
    qs: [
      {
        p: 'Spinning in place on a differential bot means:',
        c: ['Wheels counter-rotate', 'Both stop', 'Both full forward', 'One drifts'],
        a: 0,
        e: 'Equal and opposite wheel motion = rotation.',
      },
    ],
  },
  {
    key: 'rb-loc-02',
    unit: 'Locomotion',
    title: 'Ackermann Steering (Car)',
    level: 'advanced',
    body:
      'Car-like steering angles the front wheels so their axes meet at the turning center: the inner wheel turns more. Four-bar linkage (Ackermann geometry) does it mechanically. Nonholonomic — you cannot drive sideways.',
    qs: [
      {
        p: 'Ackermann steering means the inner wheel:',
        c: ['Turns more than the outer wheel', 'Turns the same', 'Stays straight', 'Reverses'],
        a: 0,
        e: 'Both wheels circle the same center point.',
      },
    ],
  },
  {
    key: 'rb-loc-03',
    unit: 'Locomotion',
    title: 'Omnidirectional Wheels',
    level: 'advanced',
    body:
      'Mecanum/omni wheels have passive rollers so the robot can strafe: moving diagonally translates to a lateral component. With rollers at the right angle, three or four wheels give full 3-DOF motion in the plane.',
    qs: [
      {
        p: 'Mecanum wheels allow:',
        c: ['Strafing sideways', 'Only straight lines', 'Only spinning', 'Climbing stairs'],
        a: 0,
        e: 'Rollers redirect wheel spin into lateral force.',
      },
    ],
  },
  {
    key: 'rb-loc-04',
    unit: 'Locomotion',
    title: 'Biped and Legged Basics',
    level: 'advanced',
    body:
      'Legs trade wheel simplicity for terrain access. Zero-moment-point (ZMP) control keeps a biped balanced under dynamics; quadruped gaits (trot/bound) alternate stance legs. Legged robots are control-system exercises as much as hardware.',
    qs: [
      {
        p: 'Biped balance centers around:',
        c: ['Keeping the center of mass controlled', 'High motor torque only', 'Wide feet only', 'Tall legs'],
        a: 0,
        e: 'CoM management under foot forces.',
      },
    ],
  },

  // ── Manipulation
  {
    key: 'rb-man-01',
    unit: 'Manipulation & End Effectors',
    title: 'Gripper Types',
    level: 'basic',
    body:
      'Grippers: parallel jaws (pinch), vacuum suction (flat objects), soft/compliant fingers (fragile items), magnetic (ferrous parts). End-effector choice determines which tasks the arm can do at all.',
    qs: [
      {
        p: 'A vacuum gripper is best for:',
        c: ['Flat, sealed surfaces', 'Heavy round bars', 'Wet slippery eggs', 'Loose screws'],
        a: 0,
        e: 'Suction needs a sealed flat face.',
      },
    ],
  },
  {
    key: 'rb-man-02',
    unit: 'Manipulation & End Effectors',
    title: 'Jacobian and Tool Motion',
    level: 'advanced',
    body:
      'The Jacobian map joint velocities to end-effector (tool) velocities: v_tool = J × q_dot. Inverting it drives the tool along desired straight paths. Singularities (rank-loss) make the inverse blow up — keep the arm out of them.',
    qs: [
      {
        p: 'The Jacobian relates joint velocity to:',
        c: ['End-effector velocity', 'Battery voltage', 'Encoder counts', 'Tool offset only'],
        a: 0,
        e: 'Linear velocity kinematics.',
      },
    ],
  },
  {
    key: 'rb-man-03',
    unit: 'Manipulation & End Effectors',
    title: 'Force and Torque Sensing',
    level: 'advanced',
    body:
      'Force/torque sensors at the wrist or joints let the arm feel contact: compliant assembly (inserting pegs, sanding) needs force control, not just position. Blind position control crushes whatever is in the way.',
    qs: [
      {
        p: 'Force control lets robots:',
        c: ['Comply with contact instead of crushing', 'Move faster blindly', 'Ignore sensors', 'Fly'],
        a: 0,
        e: 'Feeling the load guides gentle interaction.',
      },
    ],
  },

  // ── Advanced & Systems
  {
    key: 'rb-adv-01',
    unit: 'Advanced Robotics',
    title: 'SLAM in a Nutshell',
    level: 'advanced',
    body:
      'SLAM answers a chicken-and-egg: where am I, and what does the map look like — simultaneously. It balances motion predictions against new sensor data to update both. Grid maps plus scan matching plus loop closure is the classic recipe.',
    qs: [
      {
        p: 'SLAM estimates:',
        c: ['Robot pose and the map together', 'Only battery', 'Only wheel speed', 'Nothing'],
        a: 0,
        e: 'Simultaneous localization and mapping.',
      },
    ],
  },
  {
    key: 'rb-adv-02',
    unit: 'Advanced Robotics',
    title: 'Path Planning: A*',
    level: 'advanced',
    body:
      'A* searches a grid for the lowest-cost path using a heuristic toward the goal. It is the workhorse of robot navigation (often through a costmap). Straight-to-goal unless obstacles; replan when the world moves.',
    qs: [
      {
        p: 'A* finds a path using:',
        c: ['Cost plus a goal heuristic', 'Random walking', 'Brute-force all paths', 'Motor encoders'],
        a: 0,
        e: 'g(n) + h(n) guides optimal-ish search.',
      },
    ],
  },
  {
    key: 'rb-adv-03',
    unit: 'Advanced Robotics',
    title: 'Teleoperation Interfaces',
    level: 'basic',
    body:
      'Teleop: the human commands motion — joystick velocity, gamepad, or phone touch. Every interface maps human intent to robot kinematics; deadzones and slew limits keep jitter from wrecking the robot.',
    qs: [
      {
        p: 'A variety joystick maps:',
        c: ['Stick deflection to velocity reference', 'Stick to the map', 'Stick to brightness', 'Stick to nothing'],
        a: 0,
        e: 'Analog deflection → commanded speed.',
      },
    ],
  },
  {
    key: 'rb-adv-04',
    unit: 'Advanced Robotics',
    title: 'Power Budgeting Your Bot',
    level: 'advanced',
    body:
      'Motors spike current at stall; wire everything for the peak, fuse the battery properly, and pick batteries by both voltage and C-rate. A stall stalled bot can melt wiring and sag the MCU rail into brownout.',
    qs: [
      {
        p: 'At stall, a DC motor current:',
        c: ['Spikes to the stall value', 'Drops to zero', 'Stays at idle', 'Becomes negative'],
        a: 0,
        e: 'No back-EMF → maximum current.',
      },
    ],
  },
  {
    key: 'rb-adv-05',
    unit: 'Advanced Robotics',
    title: 'Safety: E-Stops',
    level: 'intermediate',
    body:
      'Every real robot needs a kill: hardware emergency-stop cutting motor power and a watchdog arming the controller. A runaway robot is not a firmware bug — it is a safety violation. Design stops first.',
    qs: [
      {
        p: 'An E-stop should:',
        c: ['Directly cut actuator power', 'Send an email', 'Restart the UI', 'Queue a shutdown'],
        a: 0,
        e: 'Physical power break, independent of software.',
      },
    ],
  },
  {
    key: 'rb-adv-06',
    unit: 'Advanced Robotics',
    title: 'The Robot Project Cycle',
    level: 'basic',
    body:
      'Real robot builds iterate: requirements → mechanical mock → electronics bench → firmware spikes → integration → field testing → redesign. You will rebuild; budget the first build as a learning prototype.',
    qs: [
      {
        p: 'Integration bugs mostly show up when:',
        c: ['Subsystems are combined and tested together', 'Parts arrive', 'The CAD finishes', 'The PCB is ordered'],
        a: 0,
        e: 'True behavior appears at integration.',
      },
    ],
  },
// ── Building robots in practice
  {
    key: 'rb-pr-01',
    unit: 'Robotics in Practice',
    title: 'Line Following with PID',
    level: 'intermediate',
    body:
      'A line follower maps sensor error (line offset) to wheel-speed difference through PID: proportional steers proportional, derivative steadies, integral removes drift on curves. Tuning the gains is the whole game — too hot and it ping-pongs.',
    qs: [
      {
        p: 'The line-follow feedback variable is:',
        c: ['The side-to-side line error', 'Battery voltage', 'Motor temperature', 'RPM'],
        a: 0,
        e: 'Error = measured line offset from center.',
      },
    ],
  },
  {
    key: 'rb-pr-02',
    unit: 'Robotics in Practice',
    title: 'Differential Speed Control',
    level: 'intermediate',
    body:
      'Closed-loop wheel speed: encoder measures each wheel, a PID drives each to a commanded speed. Differential error then retargets the pair. Independent wheel loops beat open-loop PWM on every surface condition.',
    qs: [
      {
        p: 'Wheels to straight-line heading:',
        c: ['Speed loops per wheel keep both matched', 'Nothing matters', 'Voltage only', 'PWM only'],
        a: 0,
        e: 'Feedback per wheel resists drag differences.',
      },
    ],
  },
  {
    key: 'rb-pr-03',
    unit: 'Robotics in Practice',
    title: 'IMU Calibration',
    level: 'intermediate',
    body:
      'Raw IMU data is noisy and biased: gyro bias, accelerometer offset/scale, and magnetometer hard/soft iron. Calibrate by collecting static data (gravity reference) and rotating (known rates). Calibration data lives at boot, not in magic constants.',
    qs: [
      {
        p: 'Gyro bias is found by:',
        c: ['Averaging rest readings', 'Guessing', 'Spinning fast only', 'Reading the datasheet'],
        a: 0,
        e: 'Static data reveals the fixed offset.',
      },
    ],
  },
  {
    key: 'rb-pr-04',
    unit: 'Robotics in Practice',
    title: 'Robot Localization',
    level: 'advanced',
    body:
      'Localization is the "where am I" problem: predict from motion (odometry/IMU) and correct with observations (landmarks, beacons). Extended Kalman or particle filters weigh how sure each signal is. Drift kills naive integrators.',
    qs: [
      {
        p: 'Localization fuses:',
        c: ['Motion predictions with position measurements', 'Only encoders', 'Only the battery', 'Nothing'],
        a: 0,
        e: 'Prediction + measurement = estimate.',
      },
    ],
  },
  {
    key: 'rb-pr-05',
    unit: 'Robotics in Practice',
    title: 'Path Following vs Avoidance',
    level: 'advanced',
    body:
      'Path following tracks a preplanned route (pure pursuit on the nearest point); avoidance reacts to sensor surprises. Together: follow the plan, deviate around obstacles, return when safe. The split keeps planning and reaction separate.',
    qs: [
      {
        p: 'Pure pursuit works by:',
        c: ['Steering toward a lookahead point on the path', 'Following the wall', 'Random drops', 'Drifting'],
        a: 0,
        e: 'Hopping targets ahead smooth the chase.',
      },
    ],
  },
  {
    key: 'rb-pr-06',
    unit: 'Robotics in Practice',
    title: 'Robot Simulators',
    level: 'intermediate',
    body:
      'Simulators (Gazebo, Webots, physics in Unity) replay dynamics, sensors, and comms in software. They are the rehearsal stage for code — cheaper and safer than hardware, but simulated physics is not real friction.',
    qs: [
      {
        p: 'Simulators help most by:',
        c: ['Letting code run before hardware exists', 'Replacing all sensors', 'Removing math', 'Magnetizing motors'],
        a: 0,
        e: 'Logic and control iterate without the bot.',
      },
    ],
  },
  {
    key: 'rb-pr-07',
    unit: 'Robotics in Practice',
    title: 'Swarms of Simple Robots',
    level: 'advanced',
    body:
      'Swarm intelligence = many weak robots, simple local rules, emergent global behavior (foraging, clustering, assembly). Robust to single failures and cheap per unit. Coordination rules are the research: local sensing, no global plan.',
    qs: [
      {
        p: 'Swarm behavior emerges from:',
        c: ['Local rules repeated by many units', 'A central super-brain', 'GPS per robot', 'Humans'],
        a: 0,
        e: 'Simple individual + interaction = pattern.',
      },
    ],
  },
  {
    key: 'rb-pr-08',
    unit: 'Robotics in Practice',
    title: 'Teleop Latency',
    level: 'advanced',
    body:
      'Remote driving over network delays means commands arrive late, which eats into the control loop’s stability margin. Predictive displays and local auto-reply mask that delay, but some tasks (surgery) need sub-100 ms round trips.',
    qs: [
      {
        p: 'High teleop latency causes:',
        c: ['Unstable and clumsy control', 'Faster responses', 'Cleaner motion', 'Cooler motors'],
        a: 0,
        e: 'Stale commands oscillate the system.',
      },
    ],
  },
  {
    key: 'rb-pr-09',
    unit: 'Robotics in Practice',
    title: 'ROS2 vs ROS1',
    level: 'intermediate',
    body:
      'ROS2 improves on ROS1 with DDS middleware: real-time control, security, cross-platform, and decentralized discovery. Node/topic/msg concepts survive. Choose ROS2 for new projects; ROS1 lingers on old tutorials.',
    qs: [
      {
        p: 'ROS2 uses DDS for:',
        c: ['Decentralized, reliable message transport', 'Replacing the kernel', 'Motor firmware', 'The PCB layout'],
        a: 0,
        e: 'DDS gives peer-to-peer pub/sub.',
      },
    ],
  },
  {
    key: 'rb-pr-10',
    unit: 'Robotics in Practice',
    title: 'Embedded ROS Bridge',
    level: 'advanced',
    body:
      'Tiny MCUs rarely run the full ROS stack: a bridge node on an MPU translates serial (micro-ROS / rosserial) topics to the ROS graph. The MCU handles real-time control; the MPU handles cognition. Split the work by capability.',
    qs: [
      {
        p: 'micro-ROS bridges:',
        c: ['MCU serial to the ROS topic graph', 'Two PCs', 'USB cables only', 'Nothing'],
        a: 0,
        e: 'Resource-light nodes join the graph.',
      },
    ],
  },
  {
    key: 'rb-pr-11',
    unit: 'Robotics in Practice',
    title: 'Battery Chemistry Choices',
    level: 'intermediate',
    body:
      'NiMH is forgiving and cheap; LiPo/Li-ion packs energy with strict charge/discharge limits; LiFePO4 is safer but lower energy. The battery\u2019s C-rate must cover peak motor current or the pack sags and the bot browns out.',
    qs: [
      {
        p: 'Battery C-rate relates to:',
        c: ['How much current the pack can deliver', 'The connector size', 'The voltage only', 'The color'],
        a: 0,
        e: 'xC = capacity × x amperes sustained.',
      },
    ],
  },
  {
    key: 'rb-pr-12',
    unit: 'Robotics in Practice',
    title: 'Camera Servoing',
    level: 'advanced',
    body:
      'Visual servoing steers the robot from camera error: feature at (x,y) vs desired (x,y) drives motion. The image Jacobian couples pixels to joint velocities, so tuning follows from insight into the loops, not guesswork.',
    qs: [
      {
        p: 'Visual servoing uses:',
        c: ['Image feature error as the feedback signal', 'Only encoders', 'The accelerometer', 'Depth always'],
        a: 0,
        e: 'Pixels become the control variable.',
      },
    ],
  },
  {
    key: 'rb-pr-13',
    unit: 'Robotics in Practice',
    title: 'Robot Ethics Basics',
    level: 'intermediate',
    body:
      'Autonomy transfers decisions to machines: whose rules, who is liable, what data is collected. Product ethics is design: safety stops, telemetry consent, and failure explanation. Engineering and ethics are the same deliverable.',
    qs: [
      {
        p: 'Design choices around autonomy include:',
        c: ['Safety, liability, and data consent', 'Only frame rates', 'Motor brands', 'Battery size'],
        a: 0,
        e: 'Responsibility is engineered in, not bolted on.',
      },
    ],
  },
  {
    key: 'rb-pr-14',
    unit: 'Robotics in Practice',
    title: 'Mechatronic Integration',
    level: 'advanced',
    body:
      'Robots fail at seams: mechanical tolerance, electrical noise, software timing meet at the connector. Integration testing — sensors to firmware to motors — is where truth lives. Design the testbed before the second prototype.',
    qs: [
      {
        p: 'Integration problems usually appear at:',
        c: ['The boundary between subsystems', 'The very first calculation', 'Before any build', 'In CAD only'],
        a: 0,
        e: 'Interfaces are where assumptions collide.',
      },
    ],
  },
  {
    key: 'rb-pr-15',
    unit: 'Robotics in Practice',
    title: 'Robot Maintenance',
    level: 'intermediate',
    body:
      'Robots wear: motor brushes, gears, belts, batteries, connectors. Maintenance plans (replace by hours/duty) beat "run until it breaks". Record duty and failures; the log tells you what actually wears fastest.',
    qs: [
      {
        p: 'Preventive maintenance is justified by:',
        c: ['Reliability vs downtime analysis', 'Feeling lucky', 'Cheapest parts', 'Random schedules'],
        a: 0,
        e: 'Planned replacement beats unplanned failure.',
      },
    ],
  },
];

let cache: GeneratedGroup | null = null;
export function robotics(): GeneratedGroup {
  cache ??= build('robotics', MODULES);
  return cache;
}