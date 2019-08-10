import React, { Component, Fragment } from 'react'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MaterialTable from 'material-table'

export default class StepperExample extends Component {
    constructor(props) {
        super(props);
        this.getSteps = this.getSteps.bind(this)
        this.getStepContent = this.getStepContent.bind(this)
        this.handleNext = this.handleNext.bind(this)
        this.handleBack = this.handleBack.bind(this)
        this.handleReset = this.handleReset.bind(this)
        this.state = {
            totalStep: 1,
            activeStep: 0,
            data: [
                { name: 'Andrew', surname: 'VH', birthYear: 1987, birthCity: 63, key: 1 },
                { name: 'Bin', surname: 'Yin', birthYear: 2017, birthCity: 34, key: 2 }
              ],
            wipData: [
                { name: 'Nayan', surname: '', birthYear: 1987, birthCity: 63, key: 1 },
                { name: 'Geepaw', surname: '', birthYear: 2017, birthCity: 34, key: 2 },
                { name: 'Poorona', surname: '', birthYear: 2017, birthCity: 34, key: 3 }
              ]
        }
    }

    getSteps() {
        return ['Waiting for process', 'Working in progress'];
    }

    getStepContent(stepIndex) {
        switch (stepIndex) {
          case 0:
            return (
                <div>
                    <MaterialTable
                        title="Waiting for accept"
                        columns={[
                        { title: 'Name', field: 'name' },
                        ]}
                        data={this.state.data}        
                        options={{
                        selection: true
                        }}
                        actions={[
                        {
                            tooltip: 'Approve',
                            icon: 'publish',
                            onClick: (evt, data) => alert('You want to delete ' + data.length + ' rows')
                        },
                        {
                            tooltip: 'Reject',
                            icon: 'remove_circle_outline',
                            onClick: (evt, data) => alert('You want to delete ' + data.length + ' rows')
                        },
                        {
                            tooltip: 'Refresh',
                            icon: 'autorenew',
                            onClick: (evt, data) => alert('You want to delete ' + data.length + ' rows')
                        }
                        ]}
                    />
                </div>
            );
          case 1:
            return (
                <div>
                    <MaterialTable
                        title="Working in process"
                        columns={[
                        { title: 'Name', field: 'name' },
                        ]}
                        data={this.state.wipData}        
                        options={{
                        selection: true
                        }}
                        actions={[
                            {
                                tooltip: 'Reject',
                                icon: 'remove_circle_outline',
                                onClick: (evt, data) => {
                                    //alert('You want to delete ' + data.length + ' rows')
                                    console.log(data)
                                    data.forEach((it) => {
                                      console.log(it.key)
                                      this.setState((prevState) => {
                                          let prevData = [...prevState.wipData]
                                          prevData = prevData.filter(instrument => instrument.key !== it.key)
                                          console.log(prevData.length)
                                          return{wipData: prevData}
                                      })
                                    })
                                }
                            },
                        ]}
                    />
                </div>
            );
          default:
            return 'Uknown stepIndex';
        }
    }
    
    handleNext() {
        if (this.state.activeStep === 0) {
            console.log("upload")
        }
        else {
            console.log("stage")
        }
        this.setState((prevState) => {
            let prevStep = prevState.activeStep;
            if (prevStep === 0) prevStep = prevStep + 1;
            else prevStep = 0;
            return {activeStep: prevStep}
        })
      }
    
    handleBack() {
        this.setState((prevState) => {
            let prevStep = prevState.activeStep
            prevStep = prevStep - 1
            return {activeStep: prevStep}
        })
      }
    
    handleReset() {
        this.setState(() => {
            return {activeStep: 0}
        })
      }

    render() {
        const steps = this.getSteps();
        return (
            <Fragment>
                <Stepper activeStep={this.state.activeStep} alternativeLabel>
                    {steps.map(label => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                    ))}
                </Stepper>
                <div>
                    {this.state.activeStep === steps.length ? (
                    <div>
                        <Typography>All steps completed</Typography>
                        <Button onClick={this.handleReset}>Reset</Button>
                    </div>
                    ) : (
                    <div>
                        <div>{this.getStepContent(this.state.activeStep)}</div>
                        <div>
                        <Button
                            disabled={this.state.activeStep === 0}
                            onClick={this.handleBack}
                        >
                            Back
                        </Button>
                        <Button variant="contained" color="primary" onClick={this.handleNext}>
                            {this.state.activeStep === steps.length - 1 ? 'Stage' : 'Upload'}
                        </Button>
                        </div>
                    </div>
                    )}
                </div>
            </Fragment>
        );
    }
}