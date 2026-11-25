import React, { useState } from 'react';
import {
  Button,
  IconButton,
  Chip,
  Selection,
  InputField,
  ProgressBar,
  ProgressPie,
  ProgressDonut,
  Loader,
  SegmentedProgress,
  SegmentedChild,
  Stepper,
  StepperChild,
  type ButtonType,
  type ButtonSize,
  type ProgressType,
} from '@ba-design-system/react';
import {
  IconCheck,
  IconCopy,
  IconSparkles,
  IconAdjustments,
} from '@tabler/icons-react';

export function BAReactPrimitivesStory() {
  // Button state
  const [btnType, setBtnType] = useState<ButtonType>('Primary');
  const [btnSize, setBtnSize] = useState<ButtonSize>('Large');
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [btnText, setBtnText] = useState('Initiate Sleep Session');

  // Input state
  const [inputValue, setInputValue] = useState('31% slow-wave sleep');
  const [inputError, setInputError] = useState(false);
  const [inputLabel, setInputLabel] = useState('Sleep Metric Threshold');

  // Selection states
  const [checkboxVal, setCheckboxVal] = useState(true);
  const [switchVal, setSwitchVal] = useState(true);
  const [radioVal, setRadioVal] = useState<'A' | 'B'>('A');

  // Progress state
  const [progressVal, setProgressVal] = useState(68);
  const [progressType, setProgressType] = useState<ProgressType>('In Progress');

  // Stepper active step
  const [activeStep, setActiveStep] = useState(1);

  return (
    <div className="primitive-story ba-react-story">
      <div className="story-intro-hero">
        <div className="story-intro-copy">
          <span className="story-category-eyebrow">CORE UI PRIMITIVES / BA REACT</span>
          <h1 className="story-main-heading">BA React Primitives in DUSQ Theme</h1>
          <p className="story-summary-text">
            Production React primitives from <code>@ba-design-system/react</code> inheriting DUSQ warm neutral
            surfaces, deep ink typography, and <code>#C64B00</code> focus rings. Every component is fully typed
            and bound to Figma Design Tokens.
          </p>
        </div>
      </div>

      <div className="primitives-grid-sections">
        {/* Buttons Section */}
        <section className="primitive-card-section">
          <div className="section-head-bar">
            <div>
              <h2 className="primitive-section-title">Buttons & Icon Buttons</h2>
              <p className="primitive-section-desc">Primary, Default, and Ghost variants styled with DUSQ tokens</p>
            </div>
            <div className="mini-controls-bar">
              <select
                aria-label="Button Type"
                value={btnType}
                onChange={e => setBtnType(e.target.value as ButtonType)}
                className="select-mini"
              >
                <option value="Primary">Primary</option>
                <option value="Default">Default</option>
                <option value="Ghost">Ghost</option>
              </select>
              <select
                aria-label="Button Size"
                value={btnSize}
                onChange={e => setBtnSize(e.target.value as ButtonSize)}
                className="select-mini"
              >
                <option value="Large">Large</option>
                <option value="Small">Small</option>
              </select>
              <label className="checkbox-mini">
                <input
                  type="checkbox"
                  checked={btnDisabled}
                  onChange={e => setBtnDisabled(e.target.checked)}
                />
                <span>Disabled</span>
              </label>
            </div>
          </div>

          <div className="primitive-stage-box">
            <div className="components-row">
              <Button
                Type={btnType}
                Size={btnSize}
                Button={btnText}
                Enabled={!btnDisabled}
                Leading-Icon={false}
                Tailing-Icon={true}
                tailing-icon="arrow_forward"
              />
              <IconButton
                Type={btnType}
                Size={btnSize}
                Enabled={!btnDisabled}
                icon="bolt"
                aria-label="Stimulation pulse"
              />
              <IconButton
                Type="Default"
                Size={btnSize}
                Enabled={!btnDisabled}
                icon="refresh"
                aria-label="Recalibrate sensors"
              />
            </div>
          </div>
        </section>

        {/* Input Fields Section */}
        <section className="primitive-card-section">
          <div className="section-head-bar">
            <div>
              <h2 className="primitive-section-title">InputField Component</h2>
              <p className="primitive-section-desc">Clean warm-neutral inputs with focus rings and validation states</p>
            </div>
            <div className="mini-controls-bar">
              <label className="checkbox-mini">
                <input
                  type="checkbox"
                  checked={inputError}
                  onChange={e => setInputError(e.target.checked)}
                />
                <span>Error State</span>
              </label>
            </div>
          </div>

          <div className="primitive-stage-box">
            <div className="components-col" style={{ maxWidth: 440, width: '100%' }}>
              <InputField
                label={inputLabel}
                Label={true}
                value={inputValue}
                Error={inputError}
                Leading-Icon={true}
                leading-icon="monitoring"
                onChange={e => setInputValue(e.target.value)}
              />
              <InputField
                label="Sensor Bluetooth Pairing Pin"
                Label={true}
                input="Enter 6-digit code"
                Leading-Icon={true}
                leading-icon="lock"
                Tailing-Icon={false}
              />
            </div>
          </div>
        </section>

        {/* Selection: Checkbox, Switch, Radio */}
        <section className="primitive-card-section">
          <div className="section-head-bar">
            <div>
              <h2 className="primitive-section-title">Selection Primitives (Checkbox, Switch, Radio)</h2>
              <p className="primitive-section-desc">Interactive state controls with tactile transitions</p>
            </div>
          </div>

          <div className="primitive-stage-box">
            <div className="selection-showcase-grid">
              <div className="selection-item-card">
                <span className="selection-role-title">Toggle / Switch</span>
                <div className="item-row">
                  <Selection
                    Type="Toggle"
                    Checked={switchVal}
                    label="Continuous Sleep Guardian"
                    onCheckedChange={setSwitchVal}
                  />
                  <span className="state-label">{switchVal ? 'Guardian: ON' : 'Guardian: OFF'}</span>
                </div>
              </div>

              <div className="selection-item-card">
                <span className="selection-role-title">Checkbox</span>
                <div className="item-row">
                  <Selection
                    Type="Checkbox"
                    Checked={checkboxVal}
                    label="Real-time surge alerts"
                    onCheckedChange={setCheckboxVal}
                  />
                  <span className="state-label">{checkboxVal ? 'Checked' : 'Unchecked'}</span>
                </div>
              </div>

              <div className="selection-item-card">
                <span className="selection-role-title">Radio Selection</span>
                <div className="item-row-vertical">
                  <div className="radio-label-row">
                    <Selection
                      Type="Radio"
                      Checked={radioVal === 'A'}
                      label="Gentle Vagal Neuromodulation (0.5 Hz)"
                      onCheckedChange={() => setRadioVal('A')}
                    />
                  </div>
                  <div className="radio-label-row">
                    <Selection
                      Type="Radio"
                      Checked={radioVal === 'B'}
                      label="Adaptive Closed-Loop Feedback"
                      onCheckedChange={() => setRadioVal('B')}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Chips / Tags / Badges */}
        <section className="primitive-card-section">
          <div className="section-head-bar">
            <div>
              <h2 className="primitive-section-title">Chips, Tags & Badges</h2>
              <p className="primitive-section-desc">Micro-status tags and clinical category badges</p>
            </div>
          </div>

          <div className="primitive-stage-box">
            <div className="chips-flex-row">
              <Chip Type="Primary" Style="Filled" chip="DUSQ One Active" Icon={true} icon="check" />
              <Chip Type="Primary" Style="Ghost" chip="Behind-the-ear" />
              <Chip Type="Success" Style="Filled" chip="+31% Deep Sleep" Icon={true} icon="trending_up" />
              <Chip Type="Success" Style="Ghost" chip="Surge Suppressed" />
              <Chip Type="Error" Style="Filled" chip="Microarousal Detected" Icon={true} icon="warning" />
              <Chip Type="Error" Style="Ghost" chip="Sensor Displaced" />
            </div>
          </div>
        </section>

        {/* Progress & Indicators */}
        <section className="primitive-card-section">
          <div className="section-head-bar">
            <div>
              <h2 className="primitive-section-title">Progress Indicators & Loaders</h2>
              <p className="primitive-section-desc">Visualizing sleep progress, telemetry buffers, and readiness</p>
            </div>
            <div className="mini-controls-bar">
              <span className="slider-label">Value: {progressVal}%</span>
              <input
                type="range"
                min="0"
                max="100"
                value={progressVal}
                onChange={e => setProgressVal(Number(e.target.value))}
                style={{ width: 120 }}
              />
              <select
                aria-label="Progress Type"
                value={progressType}
                onChange={e => setProgressType(e.target.value as ProgressType)}
                className="select-mini"
              >
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Success">Success</option>
                <option value="Warning">Warning</option>
                <option value="Error">Error</option>
              </select>
            </div>
          </div>

          <div className="primitive-stage-box">
            <div className="progress-showcase-row">
              <div className="progress-item-block" style={{ flex: 1, minWidth: 260 }}>
                <span className="indicator-title">Linear Progress Bar</span>
                <ProgressBar Type={progressType} value={progressVal} Legend={true} />
              </div>

              <div className="progress-item-block">
                <span className="indicator-title">Progress Donut</span>
                <ProgressDonut Type={progressType} value={progressVal} Legend={true} />
              </div>

              <div className="progress-item-block">
                <span className="indicator-title">Progress Pie</span>
                <ProgressPie Type={progressType} value={progressVal} Legend={true} />
              </div>

              <div className="progress-item-block">
                <span className="indicator-title">Circular Loader</span>
                <Loader Type="Circular" />
              </div>
            </div>
          </div>
        </section>

        {/* Stepper / Multi-step Flow */}
        <section className="primitive-card-section">
          <div className="section-head-bar">
            <div>
              <h2 className="primitive-section-title">Stepper & Closed-Loop Cycle</h2>
              <p className="primitive-section-desc">The DUSQ 3-stage loop: Detect → Intervene → Stabilise</p>
            </div>
          </div>

          <div className="primitive-stage-box">
            <Stepper>
              <StepperChild
                Type={activeStep > 0 ? 'Completed' : 'In Progress'}
                title="1. Detect"
                body="Sensors capture nervous surges in real-time."
                icon="sensors"
                onClick={() => setActiveStep(0)}
              />
              <StepperChild
                Type={activeStep > 1 ? 'Completed' : activeStep === 1 ? 'In Progress' : 'Default'}
                title="2. Intervene"
                body="Delivers micro-vagus stimulation to quiet surges."
                icon="bolt"
                onClick={() => setActiveStep(1)}
              />
              <StepperChild
                Type={activeStep === 2 ? 'In Progress' : activeStep > 2 ? 'Completed' : 'Default'}
                title="3. Stabilise"
                body="Deep slow-wave sleep remains unfragmented."
                icon="bedtime"
                onClick={() => setActiveStep(2)}
              />
            </Stepper>
          </div>
        </section>
      </div>
    </div>
  );
}
